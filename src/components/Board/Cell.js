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
    if (cell.isPeople) {
      const userIndex = users.findIndex((user) => user.id === currentUser.id);
      console.log(userIndex);
      newCurrentUser = {
        // eslint-disable-next-line no-restricted-globals
        name: users[userIndex].name,
        avatar: users[userIndex].avatar,
        id: users[userIndex].id,
        life: users[userIndex].life - 10,
        nerf: users[userIndex].nerf - 10,
        x: users[userIndex].x,
        y: users[userIndex].y,
      };

      socket.emit('currentUserMove', newCurrentUser);
    } else {
      const userIndex = users.findIndex((user) => user.id === currentUser.id);
      console.log(userIndex);
      newCurrentUser = {
        // eslint-disable-next-line no-restricted-globals
        name: users[userIndex].name,
        avatar: users[userIndex].avatar,
        id: users[userIndex].id,
        life: users[userIndex].life,
        nerf: users[userIndex].nerf,
        x: cell.x,
        y: cell.y,
      };
      socket.emit('currentUserMove', newCurrentUser);
    }

    if (cell.isCoffee) {
      return 'coffeeAction';
    }
  };
  return (
    <div className={cell && handleClassname(cell)} onClick={handleClick}>
      {isPlayer && <img src={cell.avatar} alt='avatar' />}
    </div>
  );
}
