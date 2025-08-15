// Spirebound main game file

// Game state
const player = { x: 400, y: 300, size: 32, color: "#ff0" };
const keys = {};

// Handle key presses
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
  // Move player
  if (keys["ArrowLeft"]) player.x -= 4;
  if (keys["ArrowRight"]) player.x += 4;
  if (keys["ArrowUp"]) player.y -= 4;
  if (keys["ArrowDown"]) player.y += 4;
}

function draw(ctx) {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  // Title
  ctx.fillStyle = "#fff";
  ctx.font = "32px sans-serif";
  ctx.fillText("Spirebound", 300, 60);
}

function gameLoop(ctx) {
  update();
  draw(ctx);
  requestAnimationFrame(() => gameLoop(ctx));
}

window.onload = function() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  gameLoop(ctx);
};
