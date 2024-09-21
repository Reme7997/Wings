// 미로 설정: 0은 길, 1은 벽
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 50; // 각 셀 크기
let player = { x: 1, y: 1 }; // 플레이어의 시작 위치
const goal = { x: 10, y: 9 }; // 목표 위치

let timeLeft = 60; // 타이머 (초)
const timerElement = document.getElementById('time');

// 미로 그리기
function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = 'black'; // 벽 색상
      } else {
        ctx.fillStyle = 'white'; // 길 색상
      }
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}

// 플레이어 그리기
function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// 목표 지점 그리기
function drawGoal() {
  ctx.fillStyle = 'green';
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
}

// 게임 상태 업데이트
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
  drawGoal();
}

// 타이머 업데이트
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    alert('Never Give Up!'); // 실패 메시지
    window.removeEventListener('keydown', handleKeyPress); // 키보드 입력 비활성화
    clearInterval(timerInterval); // 타이머 멈춤
  }
}

// 키보드 입력 처리
function handleKeyPress(e) {
  let newX = player.x;
  let newY = player.y;

  if (e.key === 'ArrowUp') newY--;
  if (e.key === 'ArrowDown') newY++;
  if (e.key === 'ArrowLeft') newX--;
  if (e.key === 'ArrowRight') newX++;

  // 벽 충돌 체크
  if (maze[newY] && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }

  // 목표에 도달하면 성공 메시지 출력
  if (player.x === goal.x && player.y === goal.y) {
    alert('85-1815'); // 성공 메시지
    clearInterval(timerInterval); // 타이머 멈춤
    window.removeEventListener('keydown', handleKeyPress); // 키보드 입력 비활성화
  }

  updateGame();
}

// 게임 시작
updateGame();
let timerInterval = setInterval(updateTimer, 1000); // 1초마다 타이머 갱신

// 키보드 이벤트 리스너
window.addEventListener('keydown', handleKeyPress);
