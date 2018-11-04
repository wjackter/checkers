/* global document window console */
/* eslint no-param-reassign: ["error", { "props": false }] */

const COLUMNS_ROWS = 8;
const DRAG = {
  red: false,
  black: false
};

function setupPieceDragging(board) {
  const RED_DRAG = document.querySelector('#red-0');
  const BLACK_DRAG = document.querySelector('#black-0');

  board.addEventListener('dragstart', (ev) => {
    if (ev.target && ev.target.className.indexOf('piece') > -1) {
      console.log(`start dragging: ${ev.target.id}`);

      if (ev.target.className.indexOf('red') > -1) {
        ev.dataTransfer.setDragImage(RED_DRAG, 20, 20);
        DRAG.red = true;
        DRAG.black = false;
      } else {
        ev.dataTransfer.setDragImage(BLACK_DRAG, 20, 20);
        DRAG.red = false;
        DRAG.black = true;
      }

      ev.dataTransfer.setData('text', ev.target.id);
      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.effectAllowed = 'move';
    }
  });

  board.addEventListener('dragend', (ev) => {
    if (ev.target && ev.target.className.indexOf('piece') > -1) {
      console.log(`stop dragging: ${ev.target.id}`);
    }
  });
}

function setupDropZone(board) {
  board.addEventListener('dragover', (ev) => {
    ev.preventDefault();
  });

  board.addEventListener('dragenter', (ev) => {
    ev.preventDefault();
    if (ev.target && ev.target.className.indexOf('square') > -1 && ev.target.children.length === 0) {
      if ((DRAG.red && ev.target.className.indexOf('red') > -1) || (DRAG.black && ev.target.className.indexOf('black') > -1)) {
        document.querySelector(`#${ev.target.id}`).style.outline = '2px dashed white';
      }
    }
  });

  board.addEventListener('dragleave', (ev) => {
    ev.preventDefault();
    if (ev.target && ev.target.className.indexOf('square') > -1) {
      document.querySelector(`#${ev.target.id}`).style.outline = '';
    }
  });

  board.addEventListener('drop', (ev) => {
    ev.preventDefault();
    if (ev.target && ev.target.className.indexOf('square') > -1) {
      document.querySelector(`#${ev.target.id}`).style.outline = '';
      if ((DRAG.red && ev.target.className.indexOf('red') > -1) || (DRAG.black && ev.target.className.indexOf('black') > -1)) {
        const piece = document.querySelector(`#${ev.dataTransfer.getData('text')}`);
        piece.parentNode.removeChild(piece);
        ev.target.appendChild(piece);
      }
    }
    DRAG.black = false;
    DRAG.red = false;
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
  setupDropZone(gameBoard);

  setupSquareIds(document.querySelectorAll('td.square'));
}

window.addEventListener('load', setupGame);
