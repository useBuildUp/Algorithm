const { sep } = require("path");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let N = +input;
let cnt = 0;
let result = [];
function Hanoi(num, from, other, to) {
  if (num === 0) {
    return;
  } else {
    Hanoi(num - 1, from, to, other);
    result.push([from, to]);
    cnt++;
    Hanoi(num - 1, other, from, to);
  }
}
Hanoi(N, "1", "2", "3");
console.log(cnt);
console.log(result.map((element) => element.join(" ")).join("\n"));
