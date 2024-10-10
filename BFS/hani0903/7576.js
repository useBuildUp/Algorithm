function solution() {
    const fs = require('fs');
    const filePath = process.platform === 'linux' ? 'dev/stdin' : '../../input.txt';
    const input = fs.readFileSync(filePath, 'utf-8').split('\n');


    const dx = [ 1,  -1,  0, 0 ];
    const dy = [ 0, 0 ,-1, 1 ];

    const [M, N] = input[0].split(' ').map(Number);
    const tomato = [];
    const queue = [];   
    let startPtr = 0;
    let endPtr = 0;


    // 토마토 저장
    for(let i = 1; i <= N; i ++) {

        const row = input[i].split(' ').map(Number);
        tomato.push(row);
    }

    // 방문 체크할 배열
    // 익는 날짜를 체크할 배열
    const days = Array.from({length : N}, () => Array(M).fill(-1));

    for(let x = 0; x < N; x++) {
        for(let y = 0; y < M; y++) {
            if(tomato[x][y] === 1) {

                //토마토 익는 날짜는 0일로 셋팅
                days[x][y] = 0;
                queue.push([x, y]);
                endPtr++;

            }
        }
    }

    // BFS
    while(startPtr < endPtr) {

        const [curX, curY] = queue[startPtr];
        startPtr++;

        //네 방향을 모두 체크
        for(let dir = 0; dir < 4; dir++) {

            const nx = curX + dx[dir]
            const ny = curY + dy[dir]

            //범위를 벗어나는 경우
            if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

            if(days[nx][ny] !== -1 || tomato[nx][ny] === -1) continue;

            if(tomato[nx][ny] === 0 ){

                queue.push([nx, ny]);
                endPtr++;
                
                days[nx][ny] = days[curX][curY] + 1;
                tomato[nx][ny] = 1;

            }
        }
    }

    let max = - 1;

    for(let i = 0; i < N; i++){
        for(let j = 0; j < M; j++) {

            if(tomato[i][j] === 0){
                console.log(-1);
                return;
            }

            if(days[i][j] > max){
                max = days[i][j];
            }
        }
    }

    console.log(max);
}

solution();