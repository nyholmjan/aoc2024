import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const getFile = async () => {
  return await readFile(resolve(__dirname + "/data.txt"), {
    encoding: "utf-8",
  });
};

const solve = async () => {
  const data = await getFile();

  const [ruleRows, updateRows] = data
    .split("\n\n")
    .map((text) => text.split("\n"));

  const rules = ruleRows.map((row) => row.split("|").map(Number));
  const updates = updateRows.map((row) => row.split(",").map(Number));

  const rulesPerValue: Record<number, number[]> = {};

  rules.forEach((row) => {
    if (!rulesPerValue[row[1]]) {
      rulesPerValue[row[1]] = [];
    }
    rulesPerValue[row[1]].push(row[0]);
  });

  const testUpdate = (update: number[]) => {
    for (let i = 0; i < update.length; i++) {
      const value = update[i];
      const mustBeAfter = rulesPerValue[value];

      if (mustBeAfter) {
        for (let j = 0; j < mustBeAfter.length; j++) {
          if (update.indexOf(mustBeAfter[j]) > i) {
            return 0;
          }
        }
      }
    }
    return 1;
  };

  const solve1 = () => {
    let result = 0;

    updates.forEach((update) => {
      if (testUpdate(update)) {
        result += update[Math.floor(update.length / 2)];
      }
    });

    console.log("5-1:", result);
  };

  solve1();

  const solve2 = () => {
    const sortFn = (a: number, b: number) => {
      if (rulesPerValue[a]?.includes(b)) {
        return 1;
      }
      return -1;
    };

    let result = 0;
    updates.forEach((update) => {
      if (!testUpdate(update)) {
        update.sort(sortFn);
        result += update[Math.floor(update.length / 2)];
      }
    });

    console.log("5-2:", result);
  };

  solve2();
};

solve();
