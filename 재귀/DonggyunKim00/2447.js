const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const STAR = ['***', '* *', '***'];

const solution = (N) => {
  if (N === 3) return STAR;

  const pattern = solution(N / 3).map((item) => item + item + item);
  const blankPattern = pattern.map((item) => {
    const start = N / 3;
    return item.slice(0, start) + ' '.repeat(start) + item.slice(start * 2);
  });

  return [pattern, blankPattern, pattern].flat();
};

const answer = solution(Number(input));
console.log(answer.join('\n'));
