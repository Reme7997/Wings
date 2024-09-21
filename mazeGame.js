const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// 미로 크기와 타일 크기 조정
const tileSize = 40;  // 타일 크기를 키워서 경로를 더 명확하게 표시
const mazeWidth = Math.floor(canvas.width / tileSize);  // 미로 가로 칸 수
const mazeHeight = Math.floor(canvas.height / tileSize);  // 미로 세로 칸 수
let maze = [];
let timeLeft = 60;
let player = { x: 1, y: 1 };
const goal = { x: mazeWidth - 2, y: mazeHeight - 2 };

const timerElement = document.getElementById('time');
let timerInterval;
const restartButton = document.getElementById('restartButton');

// 게임 초기화 함수
function initGame() {
  maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));  // 미로를 벽으로 채움
  player = { x: 1, y: 1 };  // 플레이어 시작 위치
  timeLeft = 60;  // 타이머 초기화
  timerElement.textContent = timeLeft;
  createPath();  // 정답 경로 생성
  generateMaze();  // 미로를 생성
  drawMaze();  // 미로 그리기
  restartButton.style.display = 'none';  // 재시작 버튼 숨기기
  clearInterval(timerInterval);  // 기존 타이머 중지
}

// Prim's 알고리즘을 사용한 미로 생성
function generateMaze() {
  let walls = [];
  maze[1][1] = 0;  // 시작점
  walls.push([1, 1, 'N']);
  
  while (walls.length > 0) {
    let randomWall = walls.splice(Math.floor(Math.random() * walls.length), 1)[0];
    let [x, y, direction] = randomWall;
    let nextX = x, nextY = y;
    
    if (direction === 'N') nextY -= 2;
    if (direction === 'S') nextY += 2;
    if (direction === 'E') nextX += 2;
    if (direction === 'W') nextX -= 2;
    
    if (nextX > 0 && nextY > 0 && nextX < mazeWidth - 1 && nextY < mazeHeight - 1 && maze[nextY][nextX] === 1) {
      maze[nextY][nextX] = 0;
      maze[(y + nextY) / 2][(x + nextX) / 2] = 0;
      
      if (nextY - 2 > 0) walls.push([nextX, nextY, 'N']);
      if (nextY + 2 < mazeHeight) walls.push([nextX, nextY, 'S']);
      if (nextX - 2 > 0) walls.push([nextX, nextY, 'W']);
      if (nextX + 2 < mazeWidth) walls.push([nextX, nextY, 'E']);
    }
  }
}

// 미로 그리기 함수
function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';  // 벽은 검정, 길은 흰색
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);  // 플레이어
  ctx.fillStyle = 'green';
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);  // 목표 지점
}

// 타이머 시작 함수
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Never Give Up!");
      restartGame();  // 실패 시 게임 재시작
    }
  }, 1000);
}

// 플레이어 이동 함수
function movePlayer(dx, dy) {
  let newX = player.x + dx;
  let newY = player.y + dy;
  
  if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    drawMaze();
    
    if (player.x === goal.x && player.y === goal.y) {
      clearInterval(timerInterval);  // 타이머 멈춤
      alert('85-1815');  // 성공 메시지
    }
  }
}

// 키보드 입력 이벤트 핸들러
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': movePlayer(0, -1); break;
    case 'ArrowDown': movePlayer(0, 1); break;
    case 'ArrowLeft': movePlayer(-1, 0); break;
    case 'ArrowRight': movePlayer(1, 0); break;
  }
});

// 게임 시작 버튼
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('titleScreen').style.display = 'none';
  document.getElementById('timer').style.display = 'block';
  canvas.style.display = 'block';
  
  initGame();
  startTimer();
});

// 게임 재시작 함수
function restartGame() {
  restartButton.style.display = 'block';
  restartButton.onclick = () => {
    initGame();
    startTimer();
  };
}
