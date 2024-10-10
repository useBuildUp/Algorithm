function BFS(posArr, N, M, board) {

    //방향 빠르게 계산할 배열
    const dx = [ 1, -1, 0, 0 ];
    const dy = [ 0, 0, 1, -1 ];

    const queue = [];
    
    const dist = Array.from({length: N}, () => Array(M).fill(-1));

    // 시작점들은 거리가 0이다.
    for(let [startX, startY] of posArr) {
        //큐에 넣는다.
        queue.push([startX, startY]);
        dist[startX][startY] = 0;
    }

    // 큐가 빌 때까지
    while(queue.length) {

        // 맨 앞 요소 빼기
        const [curX, curY] = queue.shift();

        // 요소의 양 옆을 살핀다.
        for(let dir = 0; dir < 4; dir++) {
            const nx = curX + dx[dir];
            const ny = curY + dy[dir];

            // 배열을 벗어나는 경우, 패스
            if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

            // 벽이거나, 이미 거리를 구한 경우 패스
            if(board[nx][ny] === '#' || dist[nx][ny] !== -1) continue;

            // 거리를 구해야하는 경우
            dist[nx][ny] = dist[curX][curY] + 1;
            queue.push([nx, ny]);
        }
    } 

    return dist;
}


function solution() {

    const fs = require('fs');
    const filePath = process.platform === 'linux' ? 'dev/stdin'  : '../../input.txt';
    const input = fs.readFileSync(filePath, 'utf-8').split('\n');

    const [N, M] = input[0].split(' ').map(Number);
    const board = [];
    const exits = [];

    // 입력 받기
    for(let i = 1; i <= N; i++){
        const row = input[i].split('');
        board.push(row);
    }

    let J = null;
    let F = [];

    // J와 F의 좌표 찾기
    for(let i = 0; i < N; i++) {

        for(let j = 0; j < M; j++) {

            //
            if(j === 0 || j === M - 1 || i === 0 || i === N - 1) {

                // 출구인지 확인
                if(board[i][j] === '.' || board[i][j] === 'J') exits.push([i, j]);
            }

            // 지훈이인 경우
            if(board[i][j] === 'J') J = [i, j];            
            
            // 불인 경우
            if(board[i][j] === 'F') F.push([i, j]);
            
        }
    }

    // 거리 배열 만들기
    const DistF = F.length > 0 ? BFS(F, N, M, board) : Array.from({ length: N }, () => Array(M).fill(-1));
    const DistJ = BFS([J], N, M, board);

    let min = Infinity;

    for(let i = 0; i < exits.length; i++) {

        let [x, y] = exits[i];        
                
        if(DistJ[x][y] !== -1 && (DistF[x][y] === -1 || DistF[x][y] > DistJ[x][y])) {
            min = Math.min(min, DistJ[x][y]);
        }        
    }

    min === Infinity ? console.log('IMPOSSIBLE') : console.log(min + 1);
}

solution();






