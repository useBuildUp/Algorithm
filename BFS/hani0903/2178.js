function solution() {

    const fs = require('fs');
    const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
    const input = fs.readFileSync(filePath, 'utf-8').split('\n');

    let [N , M] = input[0].split(' ').map(Number);

    const queue = [];
    const dist = Array.from({ length: N }, () => Array(M).fill(- 1));

    /**/
    const board = input.slice(1).map(line => line.split(''));

    // 이동 방향 (상, 하, 좌, 우)
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    queue.push([0, 0]);
    dist[0][0] = 1;

    while(queue.length > 0) { 
        
        const [curX, curY] = queue.shift();

        for (let dir = 0; dir < 4; dir++) {
            const nx = curX + dx[dir];
            const ny = curY + dy[dir];

            // 범위를 벗어난 경우 -> 무시!
            if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

            // 이미 방문했거나 이동할 수 없는 곳('0') -> 무시!
            if (dist[nx][ny] !== -1 || board[nx][ny] === '0') continue;

            // 방문!
            dist[nx][ny] = dist[curX][curY] + 1;
            queue.push([nx, ny]);
        }
    }
    console.log(dist[N-1][M-1]);
}

solution();