const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Sprite image with improved error handling
const sprite = new Image();
sprite.src = 'assets/sprite/character1.png';

// Track sprite loading state
let spriteLoaded = false;
let spriteLoadError = false;

sprite.onload = function() {
  spriteLoaded = true;
  console.log('✓ Sprite loaded successfully:', sprite.src);
  console.log('Sprite dimensions:', sprite.width + 'x' + sprite.height);
};

sprite.onerror = function() {
  spriteLoadError = true;
  console.error('✗ Failed to load sprite image at:', sprite.src);
  console.error('Please ensure the sprite file exists and is a valid image.');
  console.warn('Game will continue with fallback rectangle sprite.');
};

// Add a timeout to detect if sprite never loads
setTimeout(() => {
  if (!spriteLoaded && !spriteLoadError) {
    console.warn('⚠ Sprite loading timeout - proceeding with fallback');
    spriteLoadError = true;
  }
}, 3000);

// Sprite properties and array for multiple sprites
class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.isSprinting = false;
    this.target = null;
  }
  move(dx, dy) {
    let s = this.isSprinting ? this.speed * 2 : this.speed;
    let nx = this.x + dx * s;
    let ny = this.y + dy * s;
    
    // Get sprite dimensions (use fallback if sprite not loaded)
    const spriteWidth = spriteLoaded ? sprite.width : 16;
    const spriteHeight = spriteLoaded ? sprite.height : 16;
    
    // Boundary check (keep sprite in canvas)
    nx = Math.max(spriteWidth / 2, Math.min(canvas.width - spriteWidth / 2, nx));
    ny = Math.max(spriteHeight / 2, Math.min(canvas.height - spriteHeight / 2, ny));
    
    // Obstacle check
    if (!checkCollision(nx, ny)) {
      this.x = nx;
      this.y = ny;
    }
  }
  update() {
    if (this.target) {
      // Move toward mouse click location
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 2) {
        this.move(dx / dist, dy / dist);
      } else {
        this.target = null;
      }
    }
  }
  draw() {
    if (spriteLoaded && sprite.complete && sprite.naturalWidth > 0) {
      // Draw the actual sprite image
      ctx.drawImage(sprite, this.x - sprite.width / 2, this.y - sprite.height / 2);
    } else {
      // Fallback: draw a colored rectangle representing the character
      const size = 16; // Default sprite size for fallback
      ctx.fillStyle = '#4169E1'; // Royal blue
      ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
      
      // Add a simple face to make it more character-like
      ctx.fillStyle = '#FFD700'; // Gold for face
      ctx.fillRect(this.x - size / 2 + 2, this.y - size / 2 + 2, size - 4, 6);
    }
  }
}

const sprites = [new Sprite(canvas.width / 2, canvas.height / 2)];
let activeSprite = 0; // Control first sprite by default

// Obstacles: list of {x, y, w, h} - positioned for larger canvas
const obstacles = [
  { x: 200, y: 200, w: 80, h: 120 },
  { x: 500, y: 350, w: 120, h: 60 },
  { x: 100, y: 450, w: 60, h: 80 },
  { x: 600, y: 150, w: 100, h: 100 }
];

// Check if (nx, ny) collides with any obstacle
function checkCollision(nx, ny) {
  for (const obs of obstacles) {
    // Get sprite dimensions (use fallback if sprite not loaded)
    const spriteWidth = spriteLoaded ? sprite.width : 16;
    const spriteHeight = spriteLoaded ? sprite.height : 16;
    const halfW = spriteWidth / 2, halfH = spriteHeight / 2;
    
    if (
      nx + halfW > obs.x &&
      nx - halfW < obs.x + obs.w &&
      ny + halfH > obs.y &&
      ny - halfH < obs.y + obs.h
    ) return true;
  }
  return false;
}

// Keyboard state
const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
  // Sprint
  if (e.key === 'Shift') sprites[activeSprite].isSprinting = true;
  // Spawn new sprite (spacebar)
  if (e.code === 'Space') {
    sprites.push(new Sprite(60 + Math.random() * (canvas.width - 120), 60 + Math.random() * (canvas.height - 120)));
    activeSprite = sprites.length - 1;
  }
  // Switch sprite (Tab)
  if (e.key === 'Tab') {
    activeSprite = (activeSprite + 1) % sprites.length;
    e.preventDefault();
  }
});
document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
  if (e.key === 'Shift') sprites[activeSprite].isSprinting = false;
});

// Mouse click-move
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  sprites[activeSprite].target = { x: mx, y: my };
});

// Movement logic and animation loop
function update() {
  let dx = 0, dy = 0;
  // Arrow keys and WASD
  if (keys['arrowup'] || keys['w']) dy -= 1;
  if (keys['arrowdown'] || keys['s']) dy += 1;
  if (keys['arrowleft'] || keys['a']) dx -= 1;
  if (keys['arrowright'] || keys['d']) dx += 1;
  // Normalize for diagonal movement
  if (dx !== 0 || dy !== 0) {
    const len = Math.sqrt(dx * dx + dy * dy);
    dx /= len; dy /= len;
    sprites[activeSprite].move(dx, dy);
    sprites[activeSprite].target = null; // Cancel click-move if using keys
  }
  sprites.forEach(s => s.update());
}

// Draw everything
function draw() {
  // Draw background first
  drawBackground();
  
  // Draw obstacles
  ctx.fillStyle = 'rgba(80,40,20,0.6)';
  obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.w, obs.h));
  
  // Draw sprites
  sprites.forEach(s => s.draw());
  
  // Highlight active sprite
  const s = sprites[activeSprite];
  const spriteWidth = spriteLoaded ? sprite.width : 16;
  const spriteHeight = spriteLoaded ? sprite.height : 16;
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 2;
  ctx.strokeRect(s.x - spriteWidth / 2, s.y - spriteHeight / 2, spriteWidth, spriteHeight);
}

// Background rendering function
function drawBackground() {
  // Create gradient sky background
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#1a0142'); // Deep purple
  grad.addColorStop(1, '#2e2e5e'); // Midnight blue
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw silhouetted spires in the background
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.8);
  ctx.lineTo(canvas.width * 0.15, canvas.height * 0.6);
  ctx.lineTo(canvas.width * 0.2, canvas.height * 0.8);
  ctx.lineTo(canvas.width * 0.35, canvas.height * 0.5);
  ctx.lineTo(canvas.width * 0.4, canvas.height * 0.8);
  ctx.lineTo(canvas.width * 0.55, canvas.height * 0.65);
  ctx.lineTo(canvas.width * 0.6, canvas.height * 0.8);
  ctx.lineTo(canvas.width * 0.75, canvas.height * 0.45);
  ctx.lineTo(canvas.width * 0.85, canvas.height * 0.8);
  ctx.lineTo(canvas.width, canvas.height * 0.75);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();

  // Add some stars
  ctx.fillStyle = '#fff';
  const numStars = 50;
  for (let i = 0; i < numStars; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * (canvas.height * 0.4); // Only in upper part
    ctx.globalAlpha = Math.random() * 0.5 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Add game title
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Spirebound', canvas.width / 2, 50);
  ctx.textAlign = 'left'; // Reset text align
}

// Main loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Start the game loop immediately (don't wait for sprite)
loop();

// Also add some helpful console messages for users
console.log('🎮 Spirebound Game Started!');
console.log('📋 Controls:');
console.log('  • Arrow keys or WASD: Move character');
console.log('  • Hold Shift: Sprint');
console.log('  • Space: Spawn new sprite');
console.log('  • Tab: Switch between sprites');
console.log('  • Click: Move sprite to clicked location');