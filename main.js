// Spirebound: Welcome Screen using uploaded character sprite image at a balanced size

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the character sprite image
const heroImg = new Image();
heroImg.src = 'image_1755480371421.jpeg'; // Use your image's actual filename

heroImg.onload = function() {
  draw();
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawMoon();
  drawStars();
  drawMountains();
  drawTitle();

  // Draw the character sprite at an appropriate size (112x112 pixels), centered
  const spriteWidth = 112;
  const spriteHeight = 112;
  const x = canvas.width / 2 - spriteWidth / 2;
  const y = canvas.height / 2 - spriteHeight / 2 + 60;
  ctx.drawImage(heroImg, x, y, spriteWidth, spriteHeight);
}

if (heroImg.complete) {
  draw();
}
