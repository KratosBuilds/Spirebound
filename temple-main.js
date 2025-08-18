// Main JavaScript file for Ancient Temple Background Demo
// Demonstrates loading and rendering temple-bg1.png on a 576x324 canvas

// Get canvas element and 2D context
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Create image object for the temple background
const templeBackground = new Image();

// Load and render the temple background image
function loadBackground() {
  console.log('Loading temple background...');
  
  // Set the source path using relative path as specified
  templeBackground.src = 'assets/backgrounds/ancient-temple/temple-bg1.png';
  
  // Handle successful load
  templeBackground.onload = function() {
    console.log('Temple background loaded successfully');
    console.log(`Image size: ${templeBackground.naturalWidth}x${templeBackground.naturalHeight}`);
    
    // Clear canvas and draw the background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the temple background image scaled to fit the 576x324 canvas
    ctx.drawImage(
      templeBackground,
      0, 0, templeBackground.naturalWidth, templeBackground.naturalHeight,
      0, 0, canvas.width, canvas.height
    );
    
    console.log('Background rendered on canvas');
  };
  
  // Handle load error
  templeBackground.onerror = function() {
    console.error('Failed to load temple background');
    
    // Show error on canvas
    ctx.fillStyle = '#2c1810';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff6666';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Image Load Error', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'left';
  };
}

// Initialize when the page loads
window.addEventListener('load', loadBackground);