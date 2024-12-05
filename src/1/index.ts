import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const getFile = async () => {
  return await readFile(resolve(__dirname + "/data.txt"), {
    encoding: "utf-8",
  });
};

const solve = async () => {
  const data = await getFile();

  const first: number[] = [];
  const second: number[] = [];
  const lines = data.split("\n").map((line) => {
    return line.split("   ").map(Number);
  });

  lines.forEach(([left, right]) => {
    first.push(left);
    second.push(right);
  });

  second.sort();
  first.sort();

  const solution = first.reduce((sum, item, i) => {
    const diff = Math.abs(item - second[i]);
    return diff + sum;
  }, 0);

  console.log("1-1:", solution);

  const solution2 = first.reduce((sum, item) => {
    const amountInSecond = second.filter((val) => val === item);
    const result = item * amountInSecond.length;
    return result + sum;
  }, 0);

  console.log("1-2:", solution2);
};

solve();
