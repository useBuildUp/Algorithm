const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [A, B, C] = input[0].split(' ').map(BigInt);

const modular = (A, B, C) => {
    // 지수가 0일 때 처리
    if (B === 0n) return 1n;

    // 지수가 1일 때 처리
    if (B === 1n) return A % C;

    if (B % 2n === 0n) { // 짝수라면
        const half = modular(A, B / 2n, C);
        return (half * half) % C;
    } else { // 홀수라면
        const half = modular(A, (B - 1n) / 2n, C);
        return (half * half * (A % C)) % C;
    }
}

console.log(Number(modular(A, B, C)));
