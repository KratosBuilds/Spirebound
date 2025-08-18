window.onload = function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Load hero sprite
  const spriteImg = new Image();
  spriteImg.src = 'hero.png'; // Make sure it's exactly this name

  spriteImg.onload = function() {
    drawBackground();
    drawHero();
  };

  function drawBackground() {
    // Sky
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mountains (three layers for effect)
    // Back mountain
    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(100, 200);
    ctx.lineTo(250, 350);
    ctx.lineTo(400, 350);
    ctx.lineTo(400, 400);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fillStyle = '#444';
    ctx.fill();

    // Middle mountain
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(180, 240);
    ctx.lineTo(320, 350);
    ctx.lineTo(400, 350);
    ctx.lineTo(400, 400);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fillStyle = '#666';
    ctx.fill();

    // Front mountain
    ctx.beginPath();
    ctx.moveTo(120, 350);
    ctx.lineTo(200, 280);
    ctx.lineTo(280, 350);
    ctx.lineTo(400, 350);
    ctx.lineTo(400, 400);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fillStyle = '#888';
    ctx.fill();

    // Moon
    ctx.beginPath();
    ctx.arc(320, 80, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#bbb';
    ctx.fill();

    // Stars
    for (let i = 0; i < 40; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * 200;
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, y, 2, 2);
    }
  }

  function drawHero() {
    // Center the hero horizontally, place on ground
    const x = canvas.width / 2 - 56;
    const y = canvas.height - 112;
    ctx.drawImage(spriteImg, x, y, 112, 112);
  }
};
