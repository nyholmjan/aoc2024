import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const getFile = async () => {
  return await readFile(resolve(__dirname + "/data.txt"), {
    encoding: "utf-8",
  });
};

const solve = async () => {
  const data = await getFile();

  const rows = data.split("\n").map((row) => row.split(" ").map(Number));

  const solve1 = () => {
    let safe = 0;

    rows.forEach((row) => {
      let safeRow = 1;
      const sign = Math.sign(row[1] - row[0]);

      row.forEach((value, index) => {
        const diff = (row[index + 1] - value) * sign;
        if (row[index + 1] !== undefined && (diff > 3 || diff < 1)) {
          safeRow = 0;
        }
      });

      safe += safeRow;
    });

    console.log("2-2:", safe);
  };

  solve1();

  const solve2 = () => {
    let safe = 0;

    rows.forEach((row) => {
      let solutions = 0;

      for (let i = 0; i < row.length; i++) {
        let safeRow = 1;
        const testRow = row.slice();

        testRow.splice(i, 1);

        const sign = Math.sign(testRow[1] - testRow[0]);

        testRow.forEach((value, index) => {
          const diff = (testRow[index + 1] - value) * sign;

          if (testRow[index + 1] !== undefined && (diff > 3 || diff < 1)) {
            safeRow = 0;
          }
        });

        solutions += safeRow;
      }

      if (solutions > 0) {
        safe += 1;
      }
    });

    console.log("2-2:", safe);
  };

  solve2();
};

solve();
