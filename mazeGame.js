const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 50;

// 플레이어와 괴물 이미지 불러오기
const playerImg = new Image();
playerImg.src = 'player.png'; // 플레이어 이미지 파일
const monsterImg = new Image();
monsterImg.src = 'monster.png'; // 괴물 이미지 파일

// 플레이어와 괴물 객체
const player = { x: 1, y: 1, hp: 100, attackPower: 20 };
const monster = { x: 6, y: 5, hp: 100, attackPower: 10 };

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

// 미로 그리기
function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      ctx.fillStyle = maze[row][col] === 1 ? 'black' : 'white';
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}

// 플레이어 그리기
function drawPlayer() {
  ctx.drawImage(playerImg, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// 괴물 그리기
function drawMonster() {
  ctx.drawImage(monsterImg, monster.x * tileSize, monster.y * tileSize, tileSize, tileSize);
}

// 게임 상태 업데이트
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
  drawMonster();
  checkForBattle(); // 전투가 발생하는지 체크
}

// 전투 발생 여부 체크
function checkForBattle() {
  if (player.x === monster.x && player.y === monster.y) {
    // 전투 발생: 플레이어가 괴물을 공격하고 괴물이 반격
    monster.hp -= player.attackPower;
    player.hp -= monster.attackPower;
    
    // 괴물이 죽었을 때
    if (monster.hp <= 0) {
      alert('85-1815'); // 승리 메시지
      resetGame(); // 게임 리셋
    }
    // 플레이어가 죽었을 때
    if (player.hp <= 0) {
      alert('Never Give Up!'); // 패배 메시지
      resetGame(); // 게임 리셋
    }
  }
}

// 게임 리셋
function resetGame() {
  // 플레이어와 괴물의 체력을 초기화하고 위치를 다시 설정
  player.x = 1;
  player.y = 1;
  player.hp = 100;

  monster.x = 6;
  monster.y = 5;
  monster.hp = 100;

  updateGame();
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

  updateGame();
});

// 게임 초기화
playerImg.onload = function() {
  updateGame();
};
