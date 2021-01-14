import Cell from './Cell';
import React, { useState, useContext, useEffect, useRef } from 'react';
import './Board.scss';
import avatar from '../../avatar.jpeg';
import io from 'socket.io-client';

import { UserContext } from '../../context/UserContext';

export const createEmptyBoard = () => {
  const BOARD_SIZE = 15;
  const board = new Array(BOARD_SIZE);

  for (let x = 0; x < BOARD_SIZE; x++) {
    board[x] = new Array(10);
    for (let y = 0; y < 10; y++) {
      board[x][y] = {
        x,
        y,
        isPeople: false,
        isWall: false,
        isCoffee: false,
      };
    }
  }
  return board;
};

export const drawBoard = (board, user) => {
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
      // return user.map((u) => {
      //   return (
      //     <div key={index} className={cell.isWall ? 'wall' : 'cell'}>
      //       {cell.isPeople && <img src={u.avatar} alt='avatar' />}
      //     </div>
      //   );
      // });
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
export const populateWithCoffee = (board, coffee) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      coffee.forEach((wCell) => {
        if (wCell.x === cell.x && wCell.y === cell.y) {
          return (cell.isCoffee = true);
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
  { x: 0, y: 6 },
  { x: 0, y: 7 },
  { x: 1, y: 6 },
  // { x: 6, y: 3 },
  // { x: 3, y: 0 },
  // { x: 3, y: 2 },
  // { x: 3, y: 3 },
];

const Board = () => {
  const { users, setUsers } = useContext(UserContext);
  const [board, setBoard] = useState(createBoard(wall, users));
  const [userID, setUserID] = useState();
  console.log(board);
  console.log(users);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on('your id', (id) => {
      setUserID(id);
    });

    socketRef.current.on('message', (message) => {});
  }, []);

  return <div className='board-container'>{drawBoard(board, users)}</div>;
};

export default Board;
