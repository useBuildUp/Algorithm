const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const solution = (N, r, c) => {
  let count = 0;

  const recursion = (x, y, size) => {
    if (size === 1) return;

    const newSize = size / 2;

    // 1사분면
    if (r < y + newSize && c < x + newSize) {
      recursion(x, y, newSize);
    }
    // 2사분면
    else if (r < y + newSize && c >= x + newSize) {
      count += newSize * newSize;
      recursion(x + newSize, y, newSize);
    }
    // 3사분면
    else if (r >= y + newSize && c < x + newSize) {
      count += 2 * newSize * newSize;
      recursion(x, y + newSize, newSize);
    }
    // 4사분면
    else {
      count += 3 * newSize * newSize;
      recursion(x + newSize, y + newSize, newSize);
    }
  };

  recursion(0, 0, 2 ** N);

  return count;
};

const [N, r, c] = input;
console.log(solution(N, r, c));
