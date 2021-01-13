import './Board.scss';
export const createEmptyBoard = () => {
  const BOARD_SIZE = 10;
  const board = new Array(BOARD_SIZE);

  for (let x = 0; x < BOARD_SIZE; x++) {
    board[x] = new Array(BOARD_SIZE);
    for (let y = 0; y < BOARD_SIZE; y++) {
      board[x][y] = {
        x,
        y,
        isPlayer: false,
        isWall: false,
      };
    }
  }
  return board;
};

export const drawBoard = (board) => {
  return board.map((row) => {
    return row.map((cell, index) => {
      return <div key={index} className={cell.isWall ? 'wall' : 'cell'}></div>;
    });
  });
};

export const populateWithWall = (board, wall) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      wall.forEach((wCell) => {
        if (wCell.x === cell.x && wCell.y === cell.y) {
          console.log('mur');
          return (cell.isWall = true);
        }
      });
    });
  });
};

export const createBoard = (wall) => {
  const b = createEmptyBoard();
  populateWithWall(b, wall);
  return b;
};

export const wall = [
  { x: 0, y: 4 },
  { x: 1, y: 4 },
];
