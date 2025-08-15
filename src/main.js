// Spirebound main game file

window.onload = function() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff';
  ctx.font = '32px sans-serif';
  ctx.fillText('Welcome to Spirebound!', 220, 300);
};
