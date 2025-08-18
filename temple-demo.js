// Ancient Temple Background Demo - JavaScript
// Loads and displays the temple background image on a 576x324 canvas

// Get canvas and context
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Load the temple background image
const templeBackground = new Image();
templeBackground.src = 'assets/backgrounds/ancient-temple/temple-bg1.png';

// Handle successful image load
templeBackground.onload = function() {
  console.log('Temple background loaded successfully!');
  console.log(`Image dimensions: ${templeBackground.naturalWidth}x${templeBackground.naturalHeight}`);
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the background image to fill the entire canvas
  ctx.drawImage(
    templeBackground,
    0, 0, templeBackground.naturalWidth, templeBackground.naturalHeight, // source
    0, 0, canvas.width, canvas.height // destination (576x324)
  );
  
  // Add a subtle overlay text to show it's working
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(10, 10, 200, 30);
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px sans-serif';
  ctx.fillText('Background Loaded!', 15, 30);
};

// Handle image load error
templeBackground.onerror = function() {
  console.error('Failed to load temple background image');
  console.error('Expected path: assets/backgrounds/ancient-temple/temple-bg1.png');
  
  // Show error message on canvas
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#ff6b6b';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Image Load Error', canvas.width / 2, canvas.height / 2 - 20);
  
  ctx.fillStyle = '#ccc';
  ctx.font = '14px sans-serif';
  ctx.fillText('temple-bg1.png not found', canvas.width / 2, canvas.height / 2 + 10);
  
  ctx.textAlign = 'left';
};

// Initialize - try to load the image when page loads
window.addEventListener('load', function() {
  console.log('Page loaded, attempting to load temple background...');
  
  // Set initial canvas background while image loads
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#888';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Loading temple background...', canvas.width / 2, canvas.height / 2);
  ctx.textAlign = 'left';
});