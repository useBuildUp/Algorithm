const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const solution = (N, graph) => {
  let answer = Array(3).fill(0); // [-1, 0 ,1]

  const recursion = (x, y, size) => {
    // 모든 숫자가 같은지 판단
    let graphCount = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // 그래프를 나눴을때 첫번째 숫자와 나머지 숫자들이 같은지 비교
        if (graph[y][x] === graph[y + j][x + i]) graphCount += 1;
        else break;
      }
    }

    // 그래프 안의 모든 숫자가 같을때
    if (size * size === graphCount) return (answer[graph[y][x] + 1] += 1);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const newSize = size / 3;
        recursion(x + i * newSize, y + j * newSize, newSize);
      }
    }
  };

  recursion(0, 0, N);

  return answer;
};

const [N, ...graph] = input;
const answer = solution(N[0], graph).join('\n');
console.log(answer);
