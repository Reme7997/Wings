const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// 미로 크기와 타일 크기 설정
const tileSize = 40;
const mazeWidth = 8;  // 이진수로 변환된 이름에 맞는 크기
const mazeHeight = 8;
let maze = [];
let timeLeft = 60;
let player = { x: 0, y: 0 };  // 플레이어 시작 위치
const goal = { x: 7, y: 7 };  // 목표 지점

const timerElement = document.getElementById('time');
let timerInterval;
const restartButton = document.getElementById('restartButton');

// "무라타 후마" 이름을 이진수로 변환하여 미로 생성
const nameString = "Murata Fuma";
let binaryMaze = [];
for (let i = 0; i < nameString.length; i++) {
  let binary = nameString.charCodeAt(i).toString(2).padStart(8, '0');
  binaryMaze.push(binary.split('').map(Number));  // 각 문자를 이진수로 변환하여 배열로 저장
}

// 이진수 미로로 설정
function initGame() {
  maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));  // 미로를 벽으로 채움
  player = { x: 0, y: 0 };  // 플레이어 시작 위치
  timeLeft = 60;  // 타이머 초기화
  timerElement.textContent = timeLeft;
  createBinaryMaze();  // 이진수 미로 생성
  drawMaze();  // 미로 그리기
  restartButton.style.display = 'none';  // 재시작 버튼 숨기기
  clearInterval(timerInterval);  // 기존 타이머 중지
}

// 이진수 미로 생성 함수
function createBinaryMaze() {
  for (let y = 0; y < binaryMaze.length; y++) {
    for (let x = 0; x < binaryMaze[y].length; x++) {
      maze[y][x] = binaryMaze[y][x];  // 이진수 값으로 미로 설정 (0 = 길, 1 = 벽)
    }
  }
  maze[player.y][player.x] = 0;  // 시작점
  maze[goal.y][goal.x] = 0;  // 목표 지점
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
      alert('851815');  // 성공 메시지
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
