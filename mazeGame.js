const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20; // 각 셀 크기

// 미로 크기 설정 (20x20 크기의 미로로 설정)
const mazeWidth = 20;
const mazeHeight = 20;

// 이진수 경로 설정 ("Murata Fuma"의 모스부호 기반 이진수)
const binaryPath = "11001001011010100100011011";

// 초기 미로 설정: 전부 벽(1)으로 시작
let maze = Array(mazeHeight).fill(0).map(() => Array(mazeWidth).fill(1));

// 이진수 경로를 기반으로 경로 생성
let binaryIndex = 0;
let currentX = 1;
let currentY = 1;

// 미로에서 경로를 위한 좌표
function createBinaryPath() {
  maze[currentY][currentX] = 0;  // 시작점 설정

  for (let i = 0; i < binaryPath.length; i++) {
    if (binaryPath[binaryIndex] === "0" && currentX < mazeWidth - 2) {
      currentX += 2; // 오른쪽으로 2칸 이동
    } else if (binaryPath[binaryIndex] === "1" && currentY < mazeHeight - 2) {
      currentY += 2; // 아래쪽으로 2칸 이동
    }
    maze[currentY][currentX] = 0;  // 경로 설정
    maze[currentY - 1][currentX] = 0; // 경로 연결
    binaryIndex++;
  }
}

// Prim's 알고리즘으로 나머지 미로를 복잡하게 생성
function generateMaze() {
  let walls = [];
  
  // 시작점에서 주변 벽들을 추가
  maze[1][1] = 0;
  walls.push([1, 1, 'N']); // 북쪽으로 진행
  
  while (walls.length > 0) {
    let randomWall = walls.splice(Math.floor(Math.random() * walls.length), 1)[0];
    let [x, y, direction] = randomWall;
    let nextX = x, nextY = y;
    
    if (direction === 'N') nextY -= 2;
    if (direction === 'S') nextY += 2;
    if (direction === 'E') nextX += 2;
    if (direction === 'W') nextX -= 2;
    
    if (nextX > 0 && nextY > 0 && nextX < mazeWidth - 1 && nextY < mazeHeight - 1 && maze[nextY][nextX] === 1) {
      maze[nextY][nextX] = 0;  // 길 생성
      maze[(y + nextY) / 2][(x + nextX) / 2] = 0;  // 중간 벽 제거

      // 이웃하는 벽들을 추가
      if (nextY - 2 > 0) walls.push([nextX, nextY, 'N']);
      if (nextY + 2 < mazeHeight) walls.push([nextX, nextY, 'S']);
      if (nextX - 2 > 0) walls.push([nextX, nextY, 'W']);
      if (nextX + 2 < mazeWidth) walls.push([nextX, nextY, 'E']);
    }
  }
}

// 미로 그리기
function drawMaze() {
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = 'black'; // 벽 색상
      } else {
        ctx.fillStyle = 'white'; // 길 색상
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

// 이진수 경로 생성 후 Prim 알고리즘으로 미로 복잡하게 만들기
createBinaryPath();
generateMaze();
drawMaze();
