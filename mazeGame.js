const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40;
const maze = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

const player = {
  x: 1,
  y: 1
};

canvas.width = tileSize * maze[0].length;
canvas.height = tileSize * maze.length;

function drawMaze() {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
  drawMaze();
  drawPlayer();
});

drawMaze();
drawPlayer();
