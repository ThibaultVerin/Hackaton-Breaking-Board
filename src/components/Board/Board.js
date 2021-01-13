import React, { useState, useEffect } from 'react';
import './Board.scss';
import avatar from '../../avatar.jpeg';

export const createEmptyBoard = () => {
  const BOARD_SIZE = 10;
  const board = new Array(BOARD_SIZE);

  for (let x = 0; x < BOARD_SIZE; x++) {
    board[x] = new Array(BOARD_SIZE);
    for (let y = 0; y < BOARD_SIZE; y++) {
      board[x][y] = {
        x,
        y,
        isPeople: false,
        isWall: false,
      };
    }
  }
  return board;
};

export const drawBoard = (board) => {
  return board.map((row) => {
    return row.map((cell, index) => {
      return (
        <div key={index} className={cell.isWall ? 'wall' : 'cell'}>
          {cell.isPeople && <img src={avatar} alt='avatar' />}
        </div>
      );
    });
  });
};

export const populateWithWall = (board, wall) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      wall.forEach((wCell) => {
        if (wCell.x === cell.x && wCell.y === cell.y) {
          return (cell.isWall = true);
        }
      });
    });
  });
};
export const populateWithPeople = (board, people) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      people.forEach((p) => {
        if (p.x === cell.x && p.y === cell.y) {
          return (cell.isPeople = true);
        }
      });
    });
  });
};

export const createBoard = (wall, people) => {
  const b = createEmptyBoard();
  populateWithWall(b, wall);
  populateWithPeople(b, people);
  return b;
};

export const wall = [
  { x: 0, y: 4 },
  { x: 1, y: 4 },
  { x: 3, y: 0 },
  { x: 3, y: 1 },
  { x: 3, y: 2 },
  { x: 5, y: 9 },
  { x: 5, y: 8 },
];

const Board = () => {
  const [users, setUsers] = useState([{ x: 0, y: 1 }]);
  const [board, setBoard] = useState(createBoard(wall, users));
  console.log(board);

  return <div className='board-container'>{drawBoard(board)}</div>;
};

export default Board;
