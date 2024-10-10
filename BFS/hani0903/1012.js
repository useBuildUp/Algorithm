function solution() {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? '/dev/stdin' : '../../input.txt';
    const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

    let T = input[0].split(' ').map(Number);

    let idx = 1;

    // 이동 방향 (상, 하, 좌, 우)
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    let res = ''

    for (let t = 0; t < T; t++) {
        // 테스트 케이스마다 그리드 크기와 데이터의 개수를 읽음
        let [M, N, K] = input[idx++].split(' ').map(Number);
        const land = Array.from({ length: N }, () => Array(M).fill(0));
        const visited = Array.from({length: N}, () => Array(M).fill(false));    
        const queue = [];
        let earthWarm = 0;

        // 배추의 좌표를 1로 표시
        for (let i = 0; i < K; i++) {            
            let [x, y] = input[idx++].split(' ').map(Number);

            land[y][x] = 1;
        }

        for(let i = 0; i < N; i ++){
            for(let j = 0; j < M; j++){

                // 방문하지 않았고, 땅인 경우
                if(!visited[i][j] && land[i][j]){

                    //땅을 큐에 넣는다
                    queue.push([i, j]);
                    visited[i][j] = true;

                    //연결된 땅을 모두 찾아서 true로 표시 다 끝나면 지렁이 1증가
                    while(queue.length > 0) {

                        const [curX, curY] = queue.shift();                        

                        //네 방향 모두 체크하기
                        for(let dir = 0; dir < 4; dir++) {
                            const nx = curX + dx[dir];
                            const ny = curY + dy[dir];

                            // 범위를 넘어가면 X
                            if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
                            
                            // 이미 방문했거나 / 배추가 없는 자리면 넘어감
                            if(visited[nx][ny] ||!land[nx][ny]) continue;

                            // 방문한다
                            visited[nx][ny] = true;
                            queue.push([nx, ny]);
                        }
                    }
                    earthWarm++;
                }
            }
        }
        res += earthWarm +'\n';
    }

    console.log(res);
}

solution();
