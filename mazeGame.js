document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('titleScreen').style.display = 'none';  // 시작 화면 숨김
  document.getElementById('timer').style.display = 'block';       // 타이머 표시
  canvas.style.display = 'block';                                 // 캔버스 표시

  initGame();  // 게임 초기화
  startTimer();  // 타이머 시작

  console.log("게임이 시작되었습니다.");  // 확인용 로그
});

// 미로 그리기 함수 확인
function drawMaze() {
  console.log("drawMaze() 호출됨");  // 확인용 로그
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // 캔버스 초기화
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';  // 벽과 길 구분
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  // 플레이어 그리기
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);  

  // 목표 지점 그리기
  ctx.fillStyle = 'green';
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
}
