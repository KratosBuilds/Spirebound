// Spirebound: Mystical Fog Animation on Welcome Screen

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const fogParticles = [];

function drawBackground() {
  // Gradient night sky
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#1a0142");
  grad.addColorStop(1, "#2e2e5e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars (static, optional)
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 40; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * 300;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
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

// Mystical fog animation
function initFog() {
  for (let i = 0; i < 30; i++) {
    fogParticles.push({
      x: Math.random() * canvas.width,
      y: 410 + Math.random() * 120,
      r: 60 + Math.random() * 80,
      alpha: 0.08 + Math.random() * 0.09,
      speed: 0.18 + Math.random() * 0.22,
      drift: (Math.random() - 0.5) * 0.8, // gentle vertical movement
    });
  }
}

function updateFog() {
  for (const fog of fogParticles) {
    fog.x += fog.speed;
    fog.y += fog.drift * Math.sin(Date.now() / 1000 + fog.x / 80);
    if (fog.x - fog.r > canvas.width) {
      fog.x = -fog.r;
      fog.y = 410 + Math.random() * 120;
    }
  }
}

function drawFog() {
  ctx.save();
  for (const fog of fogParticles) {
    ctx.globalAlpha = fog.alpha;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(fog.x, fog.y, fog.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawMountains();
  drawFog();
  drawTitle();
  updateFog();
  requestAnimationFrame(animate);
}

initFog();
animate();
