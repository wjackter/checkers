/* global document window console */

function setupPieceDragging(piece) {
  console.log(`setting up drag for ${piece}`);
  piece.addEventListener('dragstart', (ev) => {
    console.log(`start dragging: ${ev.target.id}`);
  });
}

function setupGame() {
  console.log('setupGame');
  const gameBoard = document.querySelector('#game-board');
  const pieces = gameBoard.querySelectorAll('span.piece');
  for (let x = 0; x < pieces.length; x += 1) {
    setupPieceDragging(pieces[x]);
  }
}

window.addEventListener('load', setupGame);
