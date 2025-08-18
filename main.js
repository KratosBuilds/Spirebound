// Spirebound: Welcome Screen with Forest and Mountains (no fog, no stars)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Helper to draw a single tree
function drawTree(x, y, scale = 1) {
  // Trunk
  ctx.save();
  ctx.fillStyle = "#6b4f22";
  ctx.fillRect(x - 4 * scale, y, 8 * scale, 18 * scale);

  // Leaves (triangle)
  ctx.beginPath();
  ctx.moveTo(x, y - 30 * scale);
  ctx.lineTo(x - 18 * scale, y + 5 * scale);
  ctx.lineTo(x + 18 * scale, y + 5 * scale);
  ctx.closePath();
  ctx.fillStyle = "#2b8c41";
  ctx.fill();

  // Second layer of leaves
  ctx.beginPath();
  ctx.moveTo(x, y - 15 * scale);
  ctx.lineTo(x - 14 * scale, y + 10 * scale);
  ctx.lineTo(x + 14 * scale, y + 10 * scale);
  ctx.closePath();
  ctx.fillStyle = "#45bb6b";
  ctx.fill();

  ctx.restore();
}

function drawBackground() {
  // Gradient sky
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#1a0142");
  grad.addColorStop(1, "#2e2e5e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawMountains() {
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(150, 350);
  ctx.lineTo(220, canvas.height);
  ctx.lineTo(300, 320);
  ctx.lineTo(340, canvas.height);
  ctx.lineTo(430, 380);
  ctx.lineTo(490, canvas.height);
  ctx.lineTo(650, 300);
  ctx.lineTo(750, canvas.height);
  ctx.lineTo(canvas.width, canvas.height - 100);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
}

function drawForest() {
  // Draw rows of trees at different positions and scales
  const treeRows = [
    { y: 540, count: 18, scale: 1.2, spread: 40, offset: 0 },
    { y: 510, count: 15, scale: 1, spread: 50, offset: 25 },
    { y: 470, count: 12, scale: 0.8, spread: 65, offset: 10 },
    { y: 430, count: 10, scale: 0.6, spread: 70, offset: 30 }
  ];

  for (const row of treeRows) {
    for (let i = 0; i < row.count; i++) {
      const x = row.offset + i * row.spread + Math.random() * 8;
      drawTree(x, row.y, row.scale);
    }
  }
}

function drawTitle() {
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 48px serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 8;
  ctx.fillText("Welcome to Spirebound", canvas.width / 2, 100);
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawMountains();
  drawForest();
  drawTitle();
}

draw();
