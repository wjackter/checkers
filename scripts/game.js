/* global document window console */

const DRAG = {
  red: false,
  black: false
};
const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function isValidDrop(ev) {
  // const squareId = document.querySelector(`#${ev.dataTransfer.getData('piece-id')}`).parentNode.id.split('-');
  const startId = ev.dataTransfer.getData('square-id').split('-');
  const dropId = ev.target.id.split('-');

  if (parseInt(startId[1], 10) - 1 === parseInt(dropId[1], 10) || parseInt(startId[1], 10) + 1 === parseInt(dropId[1], 10)) {
    const startColumn = COLUMNS.indexOf(startId[0]);
    const endColumn = COLUMNS.indexOf(dropId[0]);
    return (startColumn + 1 === endColumn) || (startColumn - 1 === endColumn);
  }
  return false;
}

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

      ev.dataTransfer.setData('piece-id', ev.target.id);
      ev.dataTransfer.setData('square-id', ev.target.parentNode.id);
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
      if (ev.target.className.indexOf('light') > -1) {
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
      if (isValidDrop(ev) && ev.target.className.indexOf('light') > -1) {
        const piece = document.querySelector(`#${ev.dataTransfer.getData('piece-id')}`);
        piece.parentNode.removeChild(piece);
        ev.target.appendChild(piece);
      }
    }
    DRAG.black = false;
    DRAG.red = false;
  });
}

function setupSquareIds(squares) {
  let count = 0;
  for (let x = COLUMNS.length; x > 0; x -= 1) {
    for (let q = 1; q <= COLUMNS.length; q += 1) {
      squares[count].id = `${COLUMNS[q]}-${x}`;
      count += 1;
    }
  }
}

function createPieces(squares) {
  const pieces = [];
  let red = 1;
  let black = 1;
  for (let x = 0; x < 24; x += 1) {
    const piece = document.createElement('div');
    piece.draggable = true;
    if (red <= 12) {
      piece.id = `red-${red}`;
      piece.className = 'piece red';
      red += 1;
    } else {
      piece.id = `black-${black}`;
      piece.className = 'piece black';
      black += 1;
    }
    pieces.push(piece);
  }

  for (let x = 0; x < squares.length; x += 1) {
    const square = squares[x];
    if (square.className.indexOf('light') > -1) {
      const row = parseInt(square.id.split('-')[1], 10);
      if (row < 4 || row > 5) {
        square.appendChild(pieces.pop());
      }
    }
  }
}

function setupGame() {
  console.log('setupGame');
  const gameBoard = document.querySelector('#game-board');

  setupPieceDragging(gameBoard);
  setupDropZone(gameBoard);

  const squares = gameBoard.querySelectorAll('td.square');
  setupSquareIds(squares);
  createPieces(squares);
}

window.addEventListener('load', setupGame);
