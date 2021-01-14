import React, { useState, useContext, useEffect, useRef } from 'react';
import './Board.scss';
import { io } from 'socket.io-client';

import { UserContext } from '../../context/UserContext';

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

export const drawBoard = (board, user) => {
  return board.map((row) => {
    return row.map((cell, index) => {
      return user.map((u) => {
        return (
          <div key={index} className={cell.isWall ? 'wall' : 'cell'}>
            {cell.isPeople && <img src={u.avatar} alt='avatar' />}
          </div>
        );
      });
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
  const { users, setUsers } = useContext(UserContext);
  const [board, setBoard] = useState(createBoard(wall, users));
  const [userID, setUserID] = useState();
  console.log(board);
  // const socketRef = useRef();
  // socket = io.connect('/');
  const socket = io('http://localhost:5000', {
    autoConnect: false,
  });
  useEffect(() => {
    socket.open();

    let currentUser;

    socket.on('connect', () => {
      currentUser = {
        name: users[0].name,
        avatar: users[0].avatar,
        x: users[0].x,
        y: users[0].y,
        id: socket.id,
      };
      console.log(currentUser);
      setUsers([currentUser]);
      socket.emit('sendCurrentUser', currentUser);
    });

    socket.on('sendNewUser', (newUser) => {
      console.log(newUser);
      setUsers((prevState) => [...prevState, newUser]);
      console.log(users);
      socket.emit('clientSendFirstUser', currentUser);
    });

    socket.on('serverSendFirstUser', (newUser) => {
      setUsers((prevState) => [...prevState, newUser]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div className='board-container'>{drawBoard(board, users)}</div>;
};

export default Board;
