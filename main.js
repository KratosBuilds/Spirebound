// Spirebound: Mystical Fantasy RPG Hero Sprite (male, afro, dark skin, no cape, no blue shirt)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to draw the character sprite (32x48 px, scaled up)
function drawHeroSprite(x, y, scale = 6) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Colors (fantasy RPG palette)
  const skin = "#4b2e14";      // Dark skin
  const hair = "#1c1713";      // Afro
  const eyes = "#eae5cf";
  const tunic = "#6d5c38";     // Earthy brown tunic
  const pants = "#3a3223";     // Dark pants
  const belt = "#7a6350";      // Leather belt
  const boots = "#2a2320";     // Rugged boots
  const accent = "#6b8172";    // Mystical accent (sage green)

  // Legs
  ctx.fillStyle = pants;
  ctx.fillRect(13, 38, 4, 8);
  ctx.fillRect(17, 38, 4, 8);

  // Boots
  ctx.fillStyle = boots;
  ctx.fillRect(13, 46, 4, 2);
  ctx.fillRect(17, 46, 4, 2);

  // Body (tunic)
  ctx.fillStyle = tunic;
  ctx.fillRect(12, 26, 10, 12);

  // Accent trim on tunic (fantasy vibe)
  ctx.fillStyle = accent;
  ctx.fillRect(12, 26, 10, 2);
  ctx.fillRect(12, 36, 10, 2);

  // Belt
  ctx.fillStyle = belt;
  ctx.fillRect(12, 34, 10, 2);

  // Arms (tunic sleeves)
  ctx.fillStyle = tunic;
  ctx.fillRect(8, 28, 4, 10);
  ctx.fillRect(22, 28, 4, 10);

  // Hands
  ctx.fillStyle = skin;
  ctx.fillRect(8, 38, 4, 4);
  ctx.fillRect(22, 38, 4, 4);

  // Head (oval)
  ctx.beginPath();
  ctx.ellipse(17, 18, 7, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = skin;
  ctx.fill();

  // Afro (circle, mystical shadow)
  ctx.beginPath();
  ctx.arc(17, 13, 9, 0, Math.PI * 2);
  ctx.fillStyle = hair;
  ctx.shadowColor = "#463c26";
  ctx.shadowBlur = 6;
  ctx.fill();

  // Eyes
  ctx.fillStyle = eyes;
  ctx.fillRect(14, 19, 2, 2);
  ctx.fillRect(19, 19, 2, 2);

  // Eyebrows
  ctx.fillStyle = hair;
  ctx.fillRect(14, 17, 2, 1);
  ctx.fillRect(19, 17, 2, 1);

  // Mouth (neutral but confident)
  ctx.beginPath();
  ctx.arc(17, 23, 2, Math.PI * 0.12, Math.PI * 0.88);
  ctx.strokeStyle = "#26180e";
  ctx.lineWidth = 0.6;
  ctx.stroke();

  ctx.restore();
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background: mystical night
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#1a0142");
  grad.addColorStop(1, "#2e2e5e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mountains
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

  // Moon
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

  // Light stars
  for (let i = 0; i < 60; i++) {
    ctx.save();
    ctx.globalAlpha = Math.random() * 0.5 + 0.5;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * 320, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Title
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 48px serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 8;
  ctx.fillText("Welcome to Spirebound", canvas.width / 2, 100);
  ctx.restore();

  // Draw Hero Sprite
  drawHeroSprite(canvas.width / 2 - 48, canvas.height / 2 - 70, 6);
}

draw();
