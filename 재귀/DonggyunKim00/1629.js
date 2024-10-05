const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
  .readFileSync(filePath, 'utf8')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

const solution = (A, B, C) => {
  if (B === 1n) return A % C;

  // B를 2로 나눈 값을 이용 => mod 까지 한 값
  const value = solution(A, B / 2n, C) % C;

  // B가 홀수 일때
  if (B % 2n) return (value ** 2n * (A % C)) % C;

  // B가 짝수일때
  return value ** 2n % C;
};

const [A, B, C] = input;
const answer = solution(A, B, C);
console.log(answer.toString());
