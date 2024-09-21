const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;
const mazeWidth = 25;
const mazeHeight = 25;
let maze = Array(mazeHeight).fill(0).map(() => Array(mazeWidth).fill(1));

let pathCoordinates = [];
const nameString = "Murata Fuma";
for (let i = 0; i < nameString.length; i++) {
  let asciiValue = nameString.charCodeAt(i);
  let x = (asciiValue % mazeWidth);
  let y = Math.floor(asciiValue % mazeHeight);
  pathCoordinates.push([x, y]);
}

function createPath() {
  for (let i = 0; i < pathCoordinates.length; i++) {
    let [x, y] = pathCoordinates[i];
    maze[y][x] = 0;
    if (i > 0) {
      let [prevX, prevY] = pathCoordinates[i - 1];
      maze[(y + prevY) / 2][(x + prevX) / 2] = 0;
    }
  }
}

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

function drawMaze() {
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

// 페이지 로드와 함께 즉시 게임 시작
window.onload = () => {
  createPath();
  generateMaze();
  drawMaze();
};
