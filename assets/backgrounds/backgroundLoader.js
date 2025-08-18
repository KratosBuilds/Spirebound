const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// List of background image paths
const backgrounds = [
  'assets/backgrounds/background1.png',
  'assets/backgrounds/background2.png'
];

let currentBackground = 0;
const bgImage = new Image();

// Function to draw the current background
function drawBackground(index = 0) {
  bgImage.src = backgrounds[index];
  bgImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  };
}

// Draw the first background on page load
drawBackground(currentBackground);

// Example: Switch backgrounds on spacebar press
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    currentBackground = (currentBackground + 1) % backgrounds.length;
    drawBackground(currentBackground);
  }
});