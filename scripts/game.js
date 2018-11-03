/* global document window console */
/* eslint no-param-reassign: ["error", { "props": false }] */

const COLUMNS_ROWS = 8;

function setupPieceDragging(board) {
  const RED_DRAG = document.querySelector('#red-0');
  const BLACK_DRAG = document.querySelector('#black-0');
  board.addEventListener('dragstart', (ev) => {
    ev.stopPropagation();
    if (ev.target && ev.target.className.indexOf('piece') > -1) {
      console.log(`start dragging: ${ev.target.id}`);

      if (ev.target.className.indexOf('red') > -1) {
        ev.dataTransfer.setDragImage(RED_DRAG, 20, 20);
      } else {
        ev.dataTransfer.setDragImage(BLACK_DRAG, 20, 20);
      }

      ev.dataTransfer.setData('text/plain', ev.target.id);
      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.effectAllowed = 'move';
    }
  });
}

function setupSquareIds(squares) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  let count = 0;
  for (let x = COLUMNS_ROWS; x > 0; x -= 1) {
    for (let q = 0; q < letters.length; q += 1) {
      squares[count].id = `${letters[q]}-${x}`;
      count += 1;
    }
  }
}

function setupGame() {
  console.log('setupGame');
  const gameBoard = document.querySelector('#game-board');

  setupPieceDragging(gameBoard);

  setupSquareIds(document.querySelectorAll('td.square'));
}

window.addEventListener('load', setupGame);
