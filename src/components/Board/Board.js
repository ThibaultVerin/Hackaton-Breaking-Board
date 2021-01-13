import React, { useState } from 'react';
import './Board.scss';
import Cell from './Cell';

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
        <Cell
          key={index}
          cellStyle={cell.isWall ? 'wall' : 'cell'}
          isPlayer={cell.isPeople}
          cell={cell}
        />
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
];

const Board = () => {
  const [users, setUsers] = useState([{ x: 0, y: 1 }]);
  const [board, setBoard] = useState(createBoard(wall, users));
  console.log(board);
  console.log(users);

  return <div className='board-container'>{drawBoard(board)}</div>;
};

export default Board;
