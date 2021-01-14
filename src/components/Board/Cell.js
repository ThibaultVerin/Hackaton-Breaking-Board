import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { handleClassname } from './Board';

export default function Cell(props) {
  const { isPlayer, cell } = props;
  const { users, setUsers, currentUser, setCurrentUser, socket } = useContext(
    UserContext
  );
  let newCurrentUser = {};
  const handleClick = (e) => {
    console.log(cell.isCoffee);
    const userIndex = users.findIndex((user) => user.id === currentUser.id);
    console.log(userIndex);
    newCurrentUser = {
      // eslint-disable-next-line no-restricted-globals
      name: users[userIndex].name,
      avatar: users[userIndex].avatar,
      id: users[userIndex].id,
      x: cell.x,
      y: cell.y,
    };
    if (cell.isCoffee) {
      return 'coffeeAction';
    }
    console.log(users);
    socket.emit('currentUserMove', newCurrentUser);
  };
  return (
    <div className={cell && handleClassname(cell)} onClick={handleClick}>
      {isPlayer && <img src={cell.avatar} alt='avatar' />}
    </div>
  );
}
