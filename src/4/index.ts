import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const getFile = async () => {
  return await readFile(resolve(__dirname + "/data.txt"), {
    encoding: "utf-8",
  });
};

const solve = async () => {
  const data = await getFile();

  const matrix = data.split("\n").map((row) => row.split(""));

  const solve1 = () => {
    const test = (y: number, x: number) => {
      const letters = ["X", "M", "A", "S"];
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [1, 1],
        [1, -1],
        [-1, 0],
        [-1, -1],
        [-1, 1],
      ];
      let found = 0;
      for (const direction of directions) {
        let foundWord = 1;
        letters.forEach((letter, index) => {
          if (
            letter !==
            matrix[y + index * direction[0]]?.[x + direction[1] * index]
          ) {
            foundWord = 0;
          }
        });
        found += foundWord;
      }
      return found;
    };

    let result = 0;

    matrix.forEach((row, y) => {
      row.forEach((letter, x) => {
        result += test(y, x);
      });
    });

    console.log("4-1:", result);
  };

  solve1();

  const solve2 = () => {
    const test = (y: number, x: number) => {
      const letters = ["M", "A", "S"];
      const tests = [
        [
          [
            [-1, -1],
            [0, 0],
            [1, 1],
          ],
          [
            [1, 1],
            [0, 0],
            [-1, -1],
          ],
        ],
        [
          [
            [1, -1],
            [0, 0],
            [-1, 1],
          ],
          [
            [-1, 1],
            [0, 0],
            [1, -1],
          ],
        ],
      ];

      let found = 0;
      for (const testSuite of tests) {
        for (const test of testSuite) {
          let foundWord = 1;
          test.forEach((testCoords, index) => {
            if (
              letters[index] !== matrix[y + testCoords[0]]?.[x + testCoords[1]]
            ) {
              foundWord = 0;
            }
          });
          found += foundWord;
        }
      }

      return found === 2 ? 1 : 0;
    };

    let result = 0;

    matrix.forEach((row, y) => {
      row.forEach((letter, x) => {
        if (letter === "A") {
          result += test(y, x);
        }
      });
    });

    console.log("4-2:", result);
  };

  solve2();
};

solve();
