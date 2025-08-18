/**
 * Ancient Temple Background Demo - Main JavaScript File
 * 
 * This demonstrates how to load and display the ancient temple background image
 * in a JavaScript/HTML game project. The background is displayed on a canvas
 * with resolution 576x324 using the relative path as specified.
 */

// Get canvas element and 2D rendering context
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Create new image object for the temple background
const templeBackground = new Image();

/**
 * Main function to load and display the temple background
 */
function loadAndDisplayBackground() {
  console.log('Starting temple background demo...');
  console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
  
  // Set up image load success handler
  templeBackground.onload = function() {
    console.log('✓ Temple background loaded successfully!');
    console.log(`Image dimensions: ${templeBackground.naturalWidth}x${templeBackground.naturalHeight}`);
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the background image to fill the entire 576x324 canvas
    ctx.drawImage(
      templeBackground,
      0, 0, templeBackground.naturalWidth, templeBackground.naturalHeight,  // source rectangle
      0, 0, canvas.width, canvas.height                                      // destination rectangle
    );
    
    console.log('✓ Background rendered successfully on canvas');
    
    // Optional: Add a subtle frame to show the canvas boundaries
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
  };
  
  // Set up image load error handler
  templeBackground.onerror = function() {
    console.error('✗ Failed to load temple background image');
    console.error('Expected path: ../assets/backgrounds/ancient-temple/temple-bg1.png');
    
    // Display error message on canvas
    ctx.fillStyle = '#2c1810';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff6b6b';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('IMAGE LOAD ERROR', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.fillStyle = '#ccc';
    ctx.font = '14px monospace';
    ctx.fillText('temple-bg1.png not found', canvas.width / 2, canvas.height / 2 + 10);
    
    // Reset text alignment
    ctx.textAlign = 'left';
  };
  
  // Load the image using the relative path
  // Note: Using ../assets/ because this file is in temple-demo/ subdirectory
  templeBackground.src = '../assets/backgrounds/ancient-temple/temple-bg1.png';
  
  console.log('Loading image from: ../assets/backgrounds/ancient-temple/temple-bg1.png');
}

/**
 * Initialize canvas with loading state
 */
function initCanvas() {
  // Set initial canvas background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Show loading message
  ctx.fillStyle = '#888';
  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Loading temple background...', canvas.width / 2, canvas.height / 2);
  ctx.textAlign = 'left';
}

// Initialize when the DOM is loaded
window.addEventListener('load', function() {
  console.log('=== Ancient Temple Background Demo ===');
  initCanvas();
  loadAndDisplayBackground();
});

// Export functions for potential use in larger projects
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadAndDisplayBackground,
    templeBackground,
    canvas,
    ctx
  };
}