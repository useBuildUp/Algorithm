const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').toString().trim();

const TREE = ['  *  ', ' * * ', '*****'];

const solution = (N) => {
  if (N === 3) return TREE;

  const prevTree = solution(N / 2);
  let newTree = [];
  const space = ' '.repeat(N / 2);

  // 이전 트리에 공백넣기
  for (let i = 0; i < prevTree.length; i++) {
    newTree.push(space + prevTree[i] + space);
  }

  // 아래에 붙일 트리
  for (let i = 0; i < prevTree.length; i++) {
    newTree.push(prevTree[i] + ' ' + prevTree[i]);
  }

  return newTree;
};

const answer = solution(Number(input));
console.log(answer.join('\n'));
