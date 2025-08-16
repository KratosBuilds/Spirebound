const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Sprite image
const sprite = new Image();
sprite.src = 'assets/sprite/character1.png';

// Character position (centered initially)
let x = canvas.width / 2;
let y = canvas.height / 2;

// Movement speed in pixels
const speed = 5;

// Draw the sprite
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the sprite centered at (x, y)
  ctx.drawImage(sprite, x - sprite.width / 2, y - sprite.height / 2);
}

// Handle keyboard input
document.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowUp':
      y -= speed;
      break;
    case 'ArrowDown':
      y += speed;
      break;
    case 'ArrowLeft':
      x -= speed;
      break;
    case 'ArrowRight':
      x += speed;
      break;
  }
  draw();
});

// Redraw when sprite loads
sprite.onload = draw;