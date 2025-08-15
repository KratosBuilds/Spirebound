// Spirebound main game file

// Game state
const player = { x: 400, y: 300, size: 32, color: "#ff0" };
const keys = {};

// Handle key presses
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function drawBackground(ctx) {
  // Gradient sky
  const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  grad.addColorStop(0, "#1a0142"); // Deep purple
  grad.addColorStop(1, "#2e2e5e"); // Midnight blue
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Silhouetted spires
  ctx.fillStyle = "#222"; // dark silhouette
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(150, 350);
  ctx.lineTo(180, 500);
  ctx.lineTo(300, 320);
  ctx.lineTo(340, 500);
  ctx.lineTo(430, 380);
  ctx.lineTo(490, 500);
  ctx.lineTo(650, 300);
  ctx.lineTo(750, 500);
  ctx.lineTo(800, 450);
  ctx.lineTo(800, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();

  // Optional: Stars
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 40; i++) {
    let x = Math.random() * ctx.canvas.width;
    let y = Math.random() * 260;
    ctx.globalAlpha = Math.random() * 0.5 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
}

function update() {
  // Move player
  if (keys["ArrowLeft"]) player.x -= 4;
  if (keys["ArrowRight"]) player.x += 4;
  if (keys["ArrowUp"]) player.y -= 4;
  if (keys["ArrowDown"]) player.y += 4;
}

function draw(ctx) {
  drawBackground(ctx);

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
