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
        isComputer: false,
        isDesk: false,
        isTree: false,
      };
    }
  }
  return board;
};

const handleClassname = (cell) => {
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
          <div key={index} className={handleClassname(cell)}>
            {cell.isPeople && <img src={u.avatar} alt='avatar' />}
          </div>
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
        if (p.x === cell.x && p.y === cell.y) {
          return (cell.isPeople = true);
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
  { x: 0, y: 7 },
  { x: 1, y: 6 },
];

export const coffee = [{ x: 2, y: 9 }];

export const computer = [{ x: 7, y: 0 }];

export const desk = [{ x: 6, y: 2 }];

export const tree = [{ x: 7, y: 8 }];

const Board = () => {
  const { users, setUsers } = useContext(UserContext);
  const [board, setBoard] = useState(
    createBoard(tree, desk, computer, coffee, wall, users)
  );
  const [userID, setUserID] = useState();
  console.log(board);
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
