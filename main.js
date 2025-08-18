window.onload = function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const spriteImg = new Image();
  spriteImg.src = 'Hero_sprite.png';

  spriteImg.onload = function() {
    drawBackground();
    drawHero();
  };

  function drawBackground() {
    // Blue sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#4e89cf');
    skyGradient.addColorStop(1, '#1c2b4b');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mountains - back layer
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(100, 180);
    ctx.lineTo(250, 280);
    ctx.lineTo(400, 150);
    ctx.lineTo(600, 260);
    ctx.lineTo(600, 400);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fillStyle = '#44556b';
    ctx.fill();

    // Mountains - middle layer
    ctx.beginPath();
    ctx.moveTo(0, 330);
    ctx.lineTo(120, 240);
    ctx.lineTo(300, 340);
    ctx.lineTo(480, 220);
    ctx.lineTo(600, 320);
    ctx.lineTo(600, 400);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fillStyle = '#617191';
    ctx.fill();

    // Mountains - front layer
    ctx.beginPath();
    ctx.moveTo(0, 370);
    ctx.lineTo(160, 320);
    ctx.lineTo(320, 370);
    ctx.lineTo(480, 330);
    ctx.lineTo(600, 370);
    ctx.lineTo(600, 400);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fillStyle = '#a6b1be';
    ctx.fill();

    // Ground
    ctx.fillStyle = '#3a3e49';
    ctx.fillRect(0, 370, canvas.width, 30);

    // Gray moon
    ctx.beginPath();
    ctx.arc(530, 70, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#cecfcf';
    ctx.fill();

    // Light stars
    for (let i = 0; i < 60; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * 180;
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, y, 2, 2);
    }
  }

  function drawHero() {
    // Center horizontally, place sprite at ground level
    const x = canvas.width / 2 - 56;
    const y = 370 - 112; // so feet touch the ground strip
    ctx.drawImage(spriteImg, x, y, 112, 112);
  }
};
