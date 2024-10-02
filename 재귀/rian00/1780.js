const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const board = [];
for (let i = 1; i <= N; i++) {
  board.push(input[i].split(" ").map((e) => +e));
}
const checkBoard = (arr) => {
  const num = arr[0][0];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] !== num) return false;
    }
  }
  return true;
};
const numbers = [0, 0, 0];
const recursion = (arr, W) => {
  if (checkBoard(arr)) {
    numbers[arr[0][0] + 1]++;
    return;
  }
  if (arr.length > 3) {
    const w = W / 3;
    const divArrays = [];
    for (let i = 0; i < W; i += w) {
      for (let j = 0; j < W; j += w) {
        const subArray = [];
        for (let x = 0; x < w; x++) {
          subArray.push(arr[i + x].slice(j, j + w));
        }
        divArrays.push(subArray);
      }
    }
    // console.log(divArrays);
    for (let i = 0; i < divArrays.length; i++) {
      recursion(divArrays[i], W / 3);
    }
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        numbers[arr[i][j] + 1]++;
      }
    }
  }
};

recursion(board, N);

console.log(numbers.join("\n"));
