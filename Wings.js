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

function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      ctx.fillStyle = maze[row][col] === 1 ? 'black' : 'white';
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function drawGoal() {
  ctx.fillStyle = 'green';
  ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
  drawGoal();
}

// 플레이어 이동 함수
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

// 키보드 입력 처리
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') movePlayer('up');
  if (e.key === 'ArrowDown') movePlayer('down');
  if (e.key === 'ArrowLeft') movePlayer('left');
  if (e.key === 'ArrowRight') movePlayer('right');
});

// 터치 버튼 입력 처리
document.getElementById('up').addEventListener('click', () => movePlayer('up'));
document.getElementById('down').addEventListener('click', () => movePlayer('down'));
document.getElementById('left').addEventListener('click', () => movePlayer('left'));
document.getElementById('right').addEventListener('click', () => movePlayer('right'));

// 초기화
updateGame();