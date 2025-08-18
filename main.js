// Spirebound: Welcome Screen with animated sprite on ground level

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Animation Sprite Sheet Settings ---
// If you have a single-frame sprite, set NUM_FRAMES = 1
const FRAME_WIDTH = 112;
const FRAME_HEIGHT = 112;
const NUM_FRAMES = 1; // Change this to match your sprite sheet frame count (set to 1 for single-frame)
let currentFrame = 0;
let frameTick = 0;

// Load the character sprite sheet
const heroImg = new Image();
heroImg.src = 'Hero_sprite.png'; // Sprite sheet (multiple frames in a row or single frame)

heroImg.onload = function() {
  animate();
};

function drawBackground() {
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

function drawMoon() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(670, 120, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#d3d3d3";
  ctx.shadowColor = "#b0b0b0";
  ctx.shadowBlur = 45;
  ctx.globalAlpha = 0.95;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  // Craters
  ctx.beginPath();
  ctx.arc(682, 138, 8, 0, Math.PI * 2);
  ctx.arc(652, 112, 5, 0, Math.PI * 2);
  ctx.arc(692, 105, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#a9a9a9";
  ctx.fill();
  ctx.restore();
}

function drawStars() {
  for (let i = 0; i < 60; i++) {
    ctx.save();
    ctx.globalAlpha = Math.random() * 0.5 + 0.5;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * 320, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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

function drawHero() {
  const x = canvas.width / 2 - FRAME_WIDTH / 2;
  const y = canvas.height - FRAME_HEIGHT - 100; // Feet touch mountain base
  ctx.drawImage(
    heroImg,
    currentFrame * FRAME_WIDTH, 0, // source x, y (for sprite sheet)
    FRAME_WIDTH, FRAME_HEIGHT,     // source w, h
    x, y,                         // dest x, y
    FRAME_WIDTH, FRAME_HEIGHT     // dest w, h
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawMoon();
  drawStars();
  drawMountains();
  drawTitle();
  drawHero();
}

// Animation loop for sprite (will advance frames if NUM_FRAMES > 1)
function animate() {
  frameTick++;
  if (frameTick % 10 === 0 && NUM_FRAMES > 1) { // Lower is faster. Adjust for speed.
    currentFrame = (currentFrame + 1) % NUM_FRAMES;
  }
  draw();
  requestAnimationFrame(animate);
}

// If the image is cached and loads instantly
if (heroImg.complete) {
  animate();
}
