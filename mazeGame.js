const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;  // 각 타일 크기
const mazeWidth = 25;  // 미로 너비 (타일 개수)
const mazeHeight = 25;  // 미로 높이 (타일 개수)
let maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));  // 모든 셀을 벽(1)으로 초기화
let timeLeft = 60;  // 제한 시간 (60초)

const timerElement = document.getElementById('time');

// "Murata Fuma"의 ASCII 값을 기반으로 경로 설정
const pathCoordinates = [];
const nameString = "Murata Fuma";
for (let i = 0; i < nameString.length; i++) {
  let asciiValue = nameString.charCodeAt(i);
  let x = (asciiValue % mazeWidth);
  let y = Math.floor(asciiValue % mazeHeight);
  pathCoordinates.push([x, y]);
}

// 미로의 경로를 설정하는 함수
function createPath() {
  for (let i = 0; i < pathCoordinates.length; i++) {
    let [x, y] = pathCoordinates[i];
    maze[y][x] = 0;  // 0은 길
    if (i > 0) {
      let [prevX, prevY] = pathCoordinates[i - 1];
      maze[Math.floor((y + prevY) / 2)][Math.floor((x + prevX) / 2)] = 0;  // 경로를 연결
    }
  }
}

// Prim's 알고리즘을 사용하여 미로를 확장
function generateMaze() {
  let walls = [];
  maze[1][1] = 0;
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

// 미로를 캔버스에 그리는 함수
function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // 기존 내용을 지움
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';  // 벽은 검정, 길은 흰색
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

// 타이머 함수
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);  // 타이머 멈춤
      alert("Time's up! Game Over!");
      // 게임 종료 또는 재시작 로직 추가 가능
    }
  }, 1000);  // 1초마다 실행
}

// 스타트 버튼 클릭 시 미로 생성 및 그리기 시작
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('titleScreen').style.display = 'none';  // 타이틀 화면 숨김
  document.getElementById('timer').style.display = 'block';  // 타이머 표시
  canvas.style.display = 'block';  // 캔버스 표시
  
  createPath();  // 정답 경로 생성
  generateMaze();  // 미로 확장
  drawMaze();  // 미로 그리기
  startTimer();  // 타이머 시작
});
