import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const getFile = async () => {
  return await readFile(resolve(__dirname + "/data.txt"), {
    encoding: "utf-8",
  });
};

const solve = async () => {
  const data = await getFile();

  const solve1 = () => {
    const reg = /mul\(\d*,\d*\)/gm;

    const matches = data.matchAll(reg);

    let result = 0;

    for (const match of matches) {
      const values = match[0].replace("mul(", "").replace(")", "").split(",");
      result += Number(values[0]) * Number(values[1]);
    }

    console.log("3-1:", result);
  };

  solve1();

  const solve2 = () => {
    const reg = /(mul\(\d*,\d*\))|(don't\(\))|(do\(\))/gm;

    const matches = data.matchAll(reg);

    let result = 0;
    let doing = 1;

    for (const match of matches) {
      if (match[0].indexOf("do()") > -1) {
        doing = 1;
      } else if (match[0].indexOf("don't()") > -1) {
        doing = 0;
      } else {
        const values = match[0].replace("mul(", "").replace(")", "").split(",");
        if (doing) {
          result += Number(values[0]) * Number(values[1]);
        }
      }
    }

    console.log("3-2:", result);
  };

  solve2();
};

solve();
