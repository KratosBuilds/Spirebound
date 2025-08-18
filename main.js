// Spirebound: Sprite can move, jump, run, and animates. Stars are bright and do NOT twinkle or move.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Sprite sheet settings ---
const FRAME_WIDTH = 112;
const FRAME_HEIGHT = 112;

// Animation states: "idle", "run", "jump"
const ANIMATION_FRAMES = {
  idle: 1,
  run: 4,
  jump: 2
};

let currentFrame = 0;
let frameTick = 0;
let frameSpeed = 8;

// Sprite state
let spriteX = canvas.width / 2 - FRAME_WIDTH / 2;
let spriteY = canvas.height - FRAME_HEIGHT - 100;
let velocityX = 0;
let velocityY = 0;
const groundY = canvas.height - FRAME_HEIGHT - 100;
let onGround = true;
let facing = "right";

// Animation state
let animationState = "idle";
let animationFrameCount = ANIMATION_FRAMES[animationState];

// Controls
let leftPressed = false;
let rightPressed = false;
let shiftPressed = false;
let jumpPressed = false;

// Physics
const walkSpeed = 4;
const runSpeed = 8;
const gravity = 1.2;
const jumpPower = 20;

// Load the character sprite sheet
const heroImg = new Image();
heroImg.src = 'Hero_sprite.png';

heroImg.onload = function() {
  requestAnimationFrame(gameLoop);
};

// --- STAR FIELD: Generate once, fixed positions ---
const STAR_COUNT = 60;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * 320,
    r: 1.5
  });
}

function drawBackground() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#4e89cf");
  grad.addColorStop(1, "#1c2b4b");
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
  // Draw stars from the array, fixed positions, bright, no twinkle
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#e8e8ff";
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = stars[i];
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
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

function drawHero() {
  // Determine frame offset for animation state
  let frameIndex = currentFrame;
  let frameOffset = 0;
  if (animationState === "run") frameOffset = ANIMATION_FRAMES.idle;
  if (animationState === "jump") frameOffset = ANIMATION_FRAMES.idle + ANIMATION_FRAMES.run;
  if (facing === "left") {
    ctx.save();
    ctx.translate(spriteX + FRAME_WIDTH / 2, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
      heroImg,
      (frameOffset + frameIndex) * FRAME_WIDTH, 0,
      FRAME_WIDTH, FRAME_HEIGHT,
      -FRAME_WIDTH / 2, spriteY,
      FRAME_WIDTH, FRAME_HEIGHT
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      heroImg,
      (frameOffset + frameIndex) * FRAME_WIDTH, 0,
      FRAME_WIDTH, FRAME_HEIGHT,
      spriteX, spriteY,
      FRAME_WIDTH, FRAME_HEIGHT
    );
  }
}

function updateSprite() {
  let moveSpeed = shiftPressed ? runSpeed : walkSpeed;

  if (leftPressed) {
    velocityX = -moveSpeed;
    facing = "left";
  } else if (rightPressed) {
    velocityX = moveSpeed;
    facing = "right";
  } else {
    velocityX = 0;
  }

  if (jumpPressed && onGround) {
    velocityY = -jumpPower;
    onGround = false;
  }

  if (!onGround) {
    velocityY += gravity;
  }

  spriteX += velocityX;
  spriteY += velocityY;

  if (spriteY >= groundY) {
    spriteY = groundY;
    velocityY = 0;
    onGround = true;
  }

  if (spriteX < 0) spriteX = 0;
  if (spriteX + FRAME_WIDTH > canvas.width) spriteX = canvas.width - FRAME_WIDTH;

  if (!onGround) {
    animationState = "jump";
    animationFrameCount = ANIMATION_FRAMES.jump;
    frameSpeed = 12;
  } else if (velocityX !== 0) {
    animationState = "run";
    animationFrameCount = ANIMATION_FRAMES.run;
    frameSpeed = shiftPressed ? 4 : 8;
  } else {
    animationState = "idle";
    animationFrameCount = ANIMATION_FRAMES.idle;
    frameSpeed = 30;
  }
}

function updateAnimation() {
  frameTick++;
  if (frameTick % frameSpeed === 0) {
    currentFrame = (currentFrame + 1) % animationFrameCount;
  }
  if (frameTick > 10000) frameTick = 0;
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

function gameLoop() {
  updateSprite();
  updateAnimation();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(e) {
  if (e.code === "ArrowLeft") leftPressed = true;
  if (e.code === "ArrowRight") rightPressed = true;
  if (e.code === "Space") jumpPressed = true;
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") shiftPressed = true;
});
document.addEventListener('keyup', function(e) {
  if (e.code === "ArrowLeft") leftPressed = false;
  if (e.code === "ArrowRight") rightPressed = false;
  if (e.code === "Space") jumpPressed = false;
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") shiftPressed = false;
});

if (heroImg.complete) {
  requestAnimationFrame(gameLoop);
}
