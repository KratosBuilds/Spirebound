/**
 * Ancient Temple Background Demo - Main JavaScript File
 * 
 * This file demonstrates how to load and display the ancient temple background image
 * in a JavaScript/HTML game project. The background is displayed on a canvas 
 * with resolution 576x324 using the relative path specified in the requirements.
 */

// Canvas setup and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const statusElement = document.getElementById('status');

// Game/demo state
const gameState = {
  backgroundLoaded: false,
  backgroundImage: null,
  canvasWidth: 576,
  canvasHeight: 324
};

/**
 * Updates the status display
 * @param {string} message - Status message to display
 * @param {string} type - Status type: 'loading', 'success', 'error'
 */
function updateStatus(message, type) {
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
  }
  console.log(`[${type.toUpperCase()}] ${message}`);
}

/**
 * Loads the ancient temple background image
 * Uses the exact path specified in requirements: assets/backgrounds/ancient-temple/temple-bg1.png
 */
function loadBackgroundImage() {
  updateStatus('Loading temple background image...', 'loading');
  
  const backgroundImage = new Image();
  
  // Set up success handler
  backgroundImage.onload = function() {
    gameState.backgroundImage = backgroundImage;
    gameState.backgroundLoaded = true;
    
    updateStatus('Temple background loaded successfully!', 'success');
    console.log(`Image loaded - Dimensions: ${backgroundImage.naturalWidth}x${backgroundImage.naturalHeight}`);
    
    // Render the background immediately after loading
    renderBackground();
  };
  
  // Set up error handler
  backgroundImage.onerror = function() {
    updateStatus('Failed to load temple background image', 'error');
    console.error('Background image load failed');
    console.error('Expected path: assets/backgrounds/ancient-temple/temple-bg1.png');
    
    // Show error state on canvas
    showErrorState();
  };
  
  // Start loading - using the exact relative path as specified
  backgroundImage.src = 'assets/backgrounds/ancient-temple/temple-bg1.png';
  
  return backgroundImage;
}

/**
 * Renders the temple background image on the canvas
 * Scales the image to fit the 576x324 canvas resolution
 */
function renderBackground() {
  if (!gameState.backgroundLoaded || !gameState.backgroundImage) {
    console.warn('Cannot render background - image not loaded');
    return;
  }
  
  // Clear the canvas
  ctx.clearRect(0, 0, gameState.canvasWidth, gameState.canvasHeight);
  
  // Draw the background image, scaling to fit the canvas
  ctx.drawImage(
    gameState.backgroundImage,
    0, 0, gameState.backgroundImage.naturalWidth, gameState.backgroundImage.naturalHeight, // source
    0, 0, gameState.canvasWidth, gameState.canvasHeight // destination
  );
  
  // Add demo overlay to show the image is being rendered
  drawDemoOverlay();
}

/**
 * Draws a subtle overlay on the canvas to demonstrate the background is active
 */
function drawDemoOverlay() {
  // Semi-transparent info box
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(10, 10, 220, 45);
  
  // Info text
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px monospace';
  ctx.fillText('Ancient Temple Background', 15, 28);
  ctx.fillText(`Canvas: ${gameState.canvasWidth}x${gameState.canvasHeight}`, 15, 45);
  
  // Corner indicator
  ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
  ctx.fillRect(gameState.canvasWidth - 30, gameState.canvasHeight - 30, 25, 25);
  ctx.fillStyle = '#000';
  ctx.font = '12px monospace';
  ctx.fillText('✓', gameState.canvasWidth - 25, gameState.canvasHeight - 15);
}

/**
 * Shows error state when image fails to load
 */
function showErrorState() {
  ctx.fillStyle = '#2c1810';
  ctx.fillRect(0, 0, gameState.canvasWidth, gameState.canvasHeight);
  
  // Error message
  ctx.fillStyle = '#ff6b6b';
  ctx.font = '18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('IMAGE LOAD ERROR', gameState.canvasWidth / 2, gameState.canvasHeight / 2 - 30);
  
  ctx.fillStyle = '#ccc';
  ctx.font = '14px monospace';
  ctx.fillText('temple-bg1.png not found', gameState.canvasWidth / 2, gameState.canvasHeight / 2);
  ctx.fillText('Check: assets/backgrounds/ancient-temple/', gameState.canvasWidth / 2, gameState.canvasHeight / 2 + 20);
  
  ctx.textAlign = 'left';
}

/**
 * Initializes the canvas with a loading state
 */
function initializeCanvas() {
  // Set canvas background while loading
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, gameState.canvasWidth, gameState.canvasHeight);
  
  // Loading indicator
  ctx.fillStyle = '#888';
  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('LOADING...', gameState.canvasWidth / 2, gameState.canvasHeight / 2);
  
  // Loading animation dots
  let dotCount = 0;
  const loadingInterval = setInterval(() => {
    if (gameState.backgroundLoaded) {
      clearInterval(loadingInterval);
      return;
    }
    
    // Clear loading area and redraw with animated dots
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(gameState.canvasWidth / 2 - 60, gameState.canvasHeight / 2 + 10, 120, 30);
    
    ctx.fillStyle = '#888';
    ctx.fillText('LOADING' + '.'.repeat(dotCount % 4), gameState.canvasWidth / 2, gameState.canvasHeight / 2 + 30);
    dotCount++;
  }, 500);
  
  ctx.textAlign = 'left';
}

/**
 * Main initialization function - called when page loads
 */
function init() {
  console.log('Initializing Ancient Temple Background Demo...');
  console.log(`Canvas size: ${gameState.canvasWidth}x${gameState.canvasHeight}`);
  
  // Initialize canvas
  initializeCanvas();
  
  // Load the background image
  loadBackgroundImage();
}

// Initialize when the page loads
window.addEventListener('load', init);

// Export functions for potential use in larger game projects
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadBackgroundImage,
    renderBackground,
    gameState
  };
}