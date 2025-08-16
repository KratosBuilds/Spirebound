const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the sprite image
const sprite = new Image();
sprite.src = 'assets/sprite/character1.png';

// Draw the sprite when it has loaded
sprite.onload = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Center the sprite in the canvas
  const x = (canvas.width - sprite.width) / 2;
  const y = (canvas.height - sprite.height) / 2;
  ctx.drawImage(sprite, x, y);
};