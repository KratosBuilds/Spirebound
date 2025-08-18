const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load background image from root directory
const background = new Image();
background.src = 'background 1.png';

// Sprite image
const sprite = new Image();
sprite.src = 'assets/sprite/image_1755480371421.jpeg';

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
    // Boundary check (keep sprite in canvas)
    nx = Math.max(sprite.width / 2, Math.min(canvas.width - sprite.width / 2, nx));
    ny = Math.max(sprite.height / 2, Math.min(canvas.height - sprite.height / 2, ny));
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
    ctx.drawImage(sprite, this.x - sprite.width / 2, this.y - sprite.height / 2);
    // Placeholder for animation frame logic
  }
}

const sprites = [new Sprite(canvas.width / 2, canvas.height / 2)];
let activeSprite = 0; // Control first sprite by default

// Obstacles: list of {x, y, w, h}
const obstacles = [
  { x: 150, y: 120, w: 60, h: 180 },
  { x: 340, y: 320, w: 100, h: 40 }
];

// Check if (nx, ny) collides with any obstacle
function checkCollision(nx, ny) {
  for (const obs of obstacles) {
    const halfW = sprite.width / 2, halfH = sprite.height / 2;
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
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // Draw background first
  // Obstacles
  ctx.fillStyle = 'rgba(80,40,20,0.6)';
  obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.w, obs.h));
  // Sprites
  sprites.forEach(s => s.draw());
  // Highlight active sprite
  const s = sprites[activeSprite];
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 2;
  ctx.strokeRect(s.x - sprite.width / 2, s.y - sprite.height / 2, sprite.width, sprite.height);
}

// Main loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Start loop after both images load
background.onload = function() {
  sprite.onload = loop;
};
