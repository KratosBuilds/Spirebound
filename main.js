// Spirebound: Welcome Screen with Gray Glowing Moon and Light Stars (no forest, no trees)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Moon properties
const moon = {
  x: 670,
  y: 120,
  r: 50
};

// Generate light star field
const STAR_COUNT = 60;
const stars = [];
function initStars() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * 320,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    });
  }
}

function drawBackground() {
  // Gradient night sky
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#1a0142");
  grad.addColorStop(1, "#2e2e5e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawMoon() {
  // Main moon (gray, glowing)
  ctx.save();
  ctx.beginPath();
  ctx.arc(moon.x, moon.y, moon.r, 0, Math.PI * 2);
  ctx.fillStyle = "#d3d3d3";
  ctx.shadowColor = "#b0b0b0";
  ctx.shadowBlur = 45;
  ctx.globalAlpha = 0.97;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  // Craters (gray)
  ctx.beginPath();
  ctx.arc(moon.x + 12, moon.y + 18, 8, 0, Math.PI * 2);
  ctx.arc(moon.x - 18, moon.y - 8, 5, 0, Math.PI * 2);
  ctx.arc(moon.x + 22, moon.y - 15, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#a9a9a9";
  ctx.fill();
  ctx.restore();
}

function drawStars() {
  ctx.save();
  for (const star of stars) {
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
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
  drawMoon();
  drawStars();
  drawMountains();
  drawTitle();
}

initStars();
draw();
