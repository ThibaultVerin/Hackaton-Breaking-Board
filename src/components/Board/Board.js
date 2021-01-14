import React, { useState, useContext, useEffect, useRef } from 'react';
import './Board.scss';
import avatar from '../../avatar.jpeg';
import io from 'socket.io-client';
import uuid from 'react-uuid';
import Cell from './Cell';
import Background from '../Home/Background';

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
        isCoffee: false,
        isComputer: false,
        isDesk: false,
        isTree: false,
      };
    }
  }
  return board;
};
export const handleClassname = (cell) => {
  if (cell.isWall === true) {
    return 'wall';
  } else if (cell.isCoffee === true) {
    return 'coffee';
  } else if (cell.isComputer === true) {
    return 'computer';
  } else if (cell.isDesk === true) {
    return 'desk';
  } else if (cell.isTree === true) {
    return 'tree';
  } else {
    return 'cell';
  }
};

export const drawBoard = (board, user) => {
  return board.map((row) => {
    return row.map((cell, index) => {
      return user.map((u) => {
        return (
          <Cell
            key={index}
            cellStyle={cell.isWall ? 'wall' : 'cell'}
            isPlayer={cell.isPeople}
            cell={cell}
            // handleClassname={handleClassname}
          />
        );
      });
    });
  });
};
export const populateWithTree = (board, tree) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      tree.forEach((wCell) => {
        if (wCell.x === cell.x && wCell.y === cell.y) {
          return (cell.isTree = true);
        }
      });
    });
  });
};
export const populateWithDesk = (board, desk) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      desk.forEach((wCell) => {
        if (wCell.x === cell.x && wCell.y === cell.y) {
          return (cell.isDesk = true);
        }
      });
    });
  });
};
export const populateWithComputer = (board, computer) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      computer.forEach((wCell) => {
        if (wCell.x === cell.x && wCell.y === cell.y) {
          return (cell.isComputer = true);
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
        if (cell && p) {
          if (p.x === cell.x && p.y === cell.y) {
            cell.isPeople = true;
            cell.avatar = p.avatar;
            cell.user = p;
            return cell;
          }
        }
      });
    });
  });
};
export const createBoard = (tree, desk, computer, coffee, wall, people) => {
  const b = createEmptyBoard();
  populateWithTree(b, tree);
  populateWithDesk(b, desk);
  populateWithComputer(b, computer);
  populateWithCoffee(b, coffee);
  populateWithWall(b, wall);
  populateWithPeople(b, people);
  return b;
};

export const wall = [
  { x: 0, y: 6 },
  { x: 1, y: 6 },
  { x: 3, y: 6 },
  { x: 3, y: 7 },
  { x: 3, y: 8 },
  { x: 3, y: 9 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 7, y: 5 },
  { x: 8, y: 5 },
  { x: 9, y: 5 },
];

export const coffee = [{ x: 3, y: 1 }];

export const computer = [{ x: 0, y: 8 }];
export const desk = [
  { x: 7, y: 1 },
  { x: 7, y: 3 },
  { x: 9, y: 1 },
  { x: 9, y: 3 },
];

export const tree = [
  { x: 0, y: 5 },
  { x: 4, y: 9 },
  { x: 7, y: 6 },
  { x: 8, y: 9 },
  { x: 9, y: 7 },
];

const Board = () => {
  const { users, setUsers, currentUser, setCurrentUser, socket } = useContext(
    UserContext
  );
  const initialBoard = createBoard(tree, desk, computer, coffee, wall, users);

  const [board, setBoard] = useState(initialBoard);
  const [userID, setUserID] = useState();
  console.log(board);
  const socketRef = useRef();
  useEffect(() => {
    const newBoard = createBoard(tree, desk, computer, coffee, wall, users);
    console.log('set new board');
    setBoard(newBoard);
  }, [users]);

  // const socketRef = useRef();
  // socket = io.connect('/');

  useEffect(() => {
    let usersRegistered = [];
    console.log(socket);
    socket.emit('sendCurrentUser', currentUser);

    socket.on('connect', () => {
      // currentUser = {
      //   name: users[0].name,
      //   avatar: users[0].avatar,
      //   x: users[0].x,
      //   y: users[0].y,
      //   id: socket.id,
      // };
      // setCurrentUser((prevData) => {
      //   return { ...prevData, id: socket.id };
      // });
      // setUsers([currentUser]);
    });

    socket.on('sendNewUser', (newUser) => {
      const userAlreadyExist = usersRegistered.some(
        (user) => user.id === newUser.id
      );

      if (!userAlreadyExist) {
        usersRegistered.push(newUser);
        setUsers((prevState) => [...prevState, newUser]);
      }
      socket.emit('clientSendFirstUser', currentUser);
    });

    socket.on('serverSendFirstUser', (newUser) => {
      const userAlreadyExist = usersRegistered.some(
        (user) => user.id === newUser.id
      );

      if (!userAlreadyExist) {
        usersRegistered.push(newUser);
        setUsers((prevState) => [...prevState, newUser]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('otherUserMove', (data) => {
      // console.log('reception nouvelles coordonnées');
      // const userIndex = users.findIndex((user) => user.id === data.id);
      // console.log(userIndex);
      console.log('data', data);

      console.log('users', users);
      const newUsersArray = users.filter((user) => user.id !== data.id);
      console.log('before reception', newUsersArray);

      newUsersArray.push(data);
      console.log('users', users);
      console.log('array', newUsersArray);
      // if (data.id === currentUser.id) {
      //   setCurrentUser(data);
      // }
      setUsers(newUsersArray);
    });
  }, []);

  return (
    <div>
      <Background />
      <div className='board-container'>{drawBoard(board, users)}</div>
    </div>
  );
};
export default Board;
