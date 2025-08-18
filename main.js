// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the sprite image
const spriteImg = new Image();
spriteImg.src = 'hero.png';

// Draw the background: dark gray with moon and stars
function drawBackground() {
  ctx.fillStyle = '#222'; // dark gray
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw gray moon
  ctx.beginPath();
  ctx.arc(80, 80, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#bbb'; // light gray
  ctx.fill();

  // Draw light stars
  for (let i = 0; i < 30; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, 2, 2);
  }
}

// Draw the sprite image (when loaded)
function drawSprite() {
  // Position sprite at center bottom
  const x = canvas.width / 2 - 56;
  const y = canvas.height - 120;
  ctx.drawImage(spriteImg, x, y, 112, 112);
}

// Main render function
function render() {
  drawBackground();
  drawSprite();
}

// Draw when image is loaded
spriteImg.onload = render;
