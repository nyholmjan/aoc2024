import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const getFile = async () => {
  return await readFile(resolve(__dirname + "/data.txt"), {
    encoding: "utf-8",
  });
};

const solve = async () => {
  const data = await getFile();

  const directionsInOrder = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const matrix = data
    .slice()
    .split("\n")
    .map((row) => row.split(""));

  const findStartingPosition = () => {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] === "^") {
          return [y, x];
        }
      }
    }

    throw new Error("Starting position not found");
  };

  const solve1 = () => {
    const createPositionKey = (x: number, y: number) => `${x}-${y}`;
    const visitedPositions = new Set();

    let currentPosition = findStartingPosition();
    let directionIndex = 0;

    const nextStep = () => {
      const y = currentPosition[0];
      const x = currentPosition[1];
      const nextY = y + directionsInOrder[directionIndex][0];
      const nextX = x + directionsInOrder[directionIndex][1];

      const next = matrix[nextY]?.[nextX];

      if (next === undefined) {
        return 0;
      }

      if (next === "#") {
        directionIndex += directionIndex === 3 ? -3 : 1;
      }

      visitedPositions.add(
        createPositionKey(currentPosition[1], currentPosition[0]),
      );

      currentPosition[0] =
        currentPosition[0] + directionsInOrder[directionIndex][0];
      currentPosition[1] =
        currentPosition[1] + directionsInOrder[directionIndex][1];

      return 1;
    };

    while (nextStep() === 1) {}

    console.log("6-1:", visitedPositions.size + 1);
  };

  solve1();

  const solve2 = () => {
    const createPositionKey = (x: number, y: number, direction: number) =>
      `${x}-${y}-${direction}`;

    const startingPosition = findStartingPosition();

    const visitedPositions = new Set();

    let workingObstaclePositions = 0;
    let currentPosition = [...startingPosition];
    let directionIndex = 0;

    const nextStep = (obstacleY: number, obstacleX: number) => {
      const y = currentPosition[0];
      const x = currentPosition[1];
      const nextY = y + directionsInOrder[directionIndex][0];
      const nextX = x + directionsInOrder[directionIndex][1];
      const next = matrix[nextY]?.[nextX];
      if (!next) {
        return 1;
      }

      if (next === "#" || (obstacleY === nextY && obstacleX === nextX)) {
        if (
          visitedPositions.has(
            createPositionKey(
              currentPosition[1],
              currentPosition[0],
              directionIndex,
            ),
          )
        ) {
          workingObstaclePositions += 1;
          return 1;
        }

        visitedPositions.add(
          createPositionKey(
            currentPosition[1],
            currentPosition[0],
            directionIndex,
          ),
        );

        directionIndex += directionIndex === 3 ? -3 : 1;

        return 0;
      }

      currentPosition[0] =
        currentPosition[0] + directionsInOrder[directionIndex][0];
      currentPosition[1] =
        currentPosition[1] + directionsInOrder[directionIndex][1];

      return 0;
    };

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] !== "#" && matrix[y][x] !== "^") {
          currentPosition = [...startingPosition];
          visitedPositions.clear();
          directionIndex = 0;

          while (nextStep(y, x) === 0) {}
        }
      }
    }

    console.log("6-2:", workingObstaclePositions);
  };

  solve2();
};

solve();
