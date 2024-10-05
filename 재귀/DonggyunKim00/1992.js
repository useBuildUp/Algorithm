const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim().split('\n');

const solution = (N, graph) => {
  const answer = [];

  const recursion = (x, y, size) => {
    let count = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (graph[y][x] === graph[y + j][x + i]) count += 1;
        else break;
      }
    }

    if (count === size * size) return answer.push(graph[y][x]);

    answer.push('(');
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const newSize = size / 2;
        recursion(x + j * newSize, y + i * newSize, newSize);
      }
    }
    return answer.push(')');
  };

  recursion(0, 0, N);

  return answer;
};

const N = Number(input.shift());
const graph = input.map((item) => item.split('').map(Number));
const answer = solution(N, graph).join('');
console.log(answer);
