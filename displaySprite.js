const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Background image
const backgroundImg = new Image();
backgroundImg.src = 'assets/backgrounds/level1.png';

// Sprite image
const sprite = new Image();
sprite.src = 'assets/sprite/character1.png';

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
    
    // Use fallback sprite size if sprite not loaded
    const spriteWidth = (sprite.complete && sprite.naturalWidth > 0) ? sprite.width : 32;
    const spriteHeight = (sprite.complete && sprite.naturalWidth > 0) ? sprite.height : 32;
    
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
    // If sprite is loaded, draw it, otherwise draw a colored circle
    if (sprite.complete && sprite.naturalWidth > 0) {
      ctx.drawImage(sprite, this.x - sprite.width / 2, this.y - sprite.height / 2);
    } else {
      // Fallback: draw colored circle
      ctx.fillStyle = '#4a90e2';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 16, 0, Math.PI * 2);
      ctx.fill();
      
      // Add border
      ctx.strokeStyle = '#2e5c8a';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    // Placeholder for animation frame logic
    // Example: ctx.drawImage(sprite, frame * sprite.width, 0, sprite.width, sprite.height, ...)
  }
}

const sprites = [new Sprite(canvas.width / 2, canvas.height / 2)];
let activeSprite = 0; // Control first sprite by default

// Obstacles: list of {x, y, w, h} - Updated for 576x324 canvas
const obstacles = [
  { x: 200, y: 150, w: 60, h: 100 },
  { x: 400, y: 250, w: 100, h: 40 }
];

// Check if (nx, ny) collides with any obstacle
function checkCollision(nx, ny) {
  for (const obs of obstacles) {
    const spriteWidth = (sprite.complete && sprite.naturalWidth > 0) ? sprite.width : 32;
    const spriteHeight = (sprite.complete && sprite.naturalWidth > 0) ? sprite.height : 32;
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background first
  if (backgroundImg.complete && backgroundImg.naturalWidth > 0) {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  }
  
  // Obstacles
  ctx.fillStyle = 'rgba(80,40,20,0.6)';
  obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.w, obs.h));
  // Sprites
  sprites.forEach(s => s.draw());
  // Highlight active sprite
  const s = sprites[activeSprite];
  const spriteWidth = (sprite.complete && sprite.naturalWidth > 0) ? sprite.width : 32;
  const spriteHeight = (sprite.complete && sprite.naturalWidth > 0) ? sprite.height : 32;
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 2;
  ctx.strokeRect(s.x - spriteWidth / 2, s.y - spriteHeight / 2, spriteWidth, spriteHeight);
}

// Main loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Track loaded images
let spriteLoaded = false;
let backgroundLoaded = false;

// Check if both images are loaded and start the game
function checkImagesLoaded() {
  // For now, just wait for background since sprite file is corrupted
  // We can start the game with just the background loaded
  if (backgroundLoaded) {
    console.log("Background loaded, starting game loop");
    loop();
  }
}

// Start loop after both sprite and background load
sprite.onload = function() {
  console.log("Sprite loaded");
  spriteLoaded = true;
  checkImagesLoaded();
};

sprite.onerror = function() {
  console.error("Failed to load sprite:", sprite.src);
};

backgroundImg.onload = function() {
  console.log("Background loaded");
  backgroundLoaded = true;
  checkImagesLoaded();
};

backgroundImg.onerror = function() {
  console.error("Failed to load background:", backgroundImg.src);
};