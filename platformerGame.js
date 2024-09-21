const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 플레이어와 목표 이미지 불러오기
const playerImg = new Image();
playerImg.src = 'player.png'; // 플레이어 이미지 경로
const goalImg = new Image();
goalImg.src = 'goal.png'; // 목표 이미지 경로

// 플레이어 설정
const player = {
  x: 50,
  y: 350, // 초기 위치를 안전한 곳으로 설정
  width: 30,
  height: 50,
  speedX: 0,
  speedY: 0,
  gravity: 0.8,
  jumpPower: -15,
  isJumping: false,
  isOnGround: true, // 처음엔 땅에 있는 상태로 시작
  canFall: false, // 중력이 바로 적용되지 않도록 설정
};

// 목표 지점 설정
const goal = { x: 750, y: 50, width: 40, height: 40 };

// 플랫폼 설정
const platforms = [
  { x: 50, y: 300, width: 150, height: 20 },
  { x: 300, y: 250, width: 150, height: 20 },
  { x: 500, y: 150, width: 150, height: 20 },
];

// 플레이어 그리기
function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// 목표 지점 그리기
function drawGoal() {
  ctx.drawImage(goalImg, goal.x, goal.y, goal.width, goal.height);
}

// 플랫폼 그리기
function drawPlatforms() {
  ctx.fillStyle = 'green';
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

// 플레이어 이동 및 중력 적용
function updatePlayer() {
  if (player.canFall) { // 중력이 바로 적용되지 않도록 설정
    player.speedY += player.gravity; // 중력 적용
  }

  player.x += player.speedX;
  player.y += player.speedY;

  // 플랫폼 충돌 체크
  platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + 10
    ) {
      // 플랫폼 위에 있을 때
      player.y = platform.y - player.height;
      player.speedY = 0;
      player.isJumping = false;
      player.isOnGround = true; // 플랫폼 위에 있을 때는 땅에 있는 것으로 간주
    }
  });

  // 바닥에 닿으면 점프 가능하게 설정
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height; // 플레이어를 바닥에 고정
    player.speedY = 0;
    player.isOnGround = true; // 땅에 닿았을 때 상태 설정
  }

  // 플레이어가 화면 밖으로 떨어지지 않게 설정
  if (player.y + player.height > canvas.height + 50) {
    alert("Never Give Up!"); // 실패 메시지 출력
    resetGame();
  }
}

// 목표 지점 도달 체크
function checkGoal() {
  if (
    player.x < goal.x + goal.width &&
    player.x + player.width > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.height > goal.y
  ) {
    alert("85-1815"); // 목표 달성 메시지 출력
    resetGame();
  }
}

// 게임 리셋
function resetGame() {
  player.x = 50;
  player.y = 350;
  player.speedX = 0;
  player.speedY = 0;
  player.isJumping = false;
  player.isOnGround = true; // 게임 초기화 시 땅에 있는 것으로 설정
  player.canFall = false; // 중력을 다시 비활성화
}

// 키 입력 처리
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    player.speedX = -5;
  }
  if (e.key === 'ArrowRight') {
    player.speedX = 5;
  }
  if (e.key === ' ' && !player.isJumping && player.isOnGround) {
    player.speedY = player.jumpPower;
    player.isJumping = true;
    player.isOnGround = false; // 점프할 때 땅에서 벗어남
    player.canFall = true; // 점프 후 중력이 다시 작동되게 설정
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    player.speedX = 0;
  }
});

// 게임 업데이트 함수
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawPlatforms();
  drawGoal();
  updatePlayer();
  checkGoal(); // 목표 도달 체크

  requestAnimationFrame(updateGame);
}

// 게임 시작
playerImg.onload = function() {
  updateGame();
};
