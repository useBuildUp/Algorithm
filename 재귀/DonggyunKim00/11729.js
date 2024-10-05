const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const solution = (N) => {
  const answer = [];
  const recursion = (num, from, other, to) => {
    if (num === 0) {
      return;
    }
    // N-1개의 원판들을 목적지가 아닌 곳으로 옮김
    recursion(num - 1, from, to, other);

    // 맨 아래 원반을 목적지로 이동시킴
    answer.push([from, to]);

    // N-1개의 원판을 목적지로 옮김
    recursion(num - 1, other, from, to);
  };

  recursion(N, 1, 2, 3);
  return answer;
};

const answer = solution(Number(input));
console.log(answer.length);
console.log(answer.map((item) => item.join(' ')).join('\n'));
