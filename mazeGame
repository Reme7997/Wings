// 미로 설정: 0은 길, 1은 벽
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 50;
let player = { x: 1, y: 1 };
const goal = { x: 6, y: 5 };

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

// 키보드 입력 처리
window.addEventListener('keydown', (e) => {
  let newX = player.x;
  let newY = player.y;

  if (e.key === 'ArrowUp') newY--;
  if (e.key === 'ArrowDown') newY++;
  if (e.key === 'ArrowLeft') newX--;
  if (e.key === 'ArrowRight') newX++;

  // 벽 충돌 체크
  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }

  // 목표에 도달하면 승리 메시지 출력
  if (player.x === goal.x && player.y === goal.y) {
    alert('You Win!');
  }

  updateGame();
});

// 터치 버튼 입력 처리
document.getElementById('up').addEventListener('click', () => movePlayer('up'));
document.getElementById('down').addEventListener('click', () => movePlayer('down'));
document.getElementById('left').addEventListener('click', () => movePlayer('left'));
document.getElementById('right').addEventListener('click', () => movePlayer('right'));

// 터치 이동 함수
function movePlayer(dir) {
  let newX = player.x;
  let newY = player.y;

  if (dir === 'up') newY--;
  if (dir === 'down') newY++;
  if (dir === 'left') newX--;
  if (dir === 'right') newX++;

  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }

  if (player.x === goal.x && player.y === goal.y) {
    alert('You Win!');
  }

  updateGame();
}

// 초기화
updateGame();
