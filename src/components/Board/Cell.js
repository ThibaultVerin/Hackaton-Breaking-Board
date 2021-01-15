import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { handleClassname, shootPlayer } from './Board';
import { useHistory } from 'react-router-dom';

export default function Cell(props) {
  const { isPlayer, cell } = props;
  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    isActionOpen,
    setIsActionOpen,
    socket,
    setPlayerShot,
  } = useContext(UserContext);

  const history = useHistory();

  let newCurrentUser = {};

  const handleClick = (e) => {
    if (cell.isComputer) {
      history.push('/game');
    }
    if (isPlayer) {
      setPlayerShot(cell.user);

      setIsActionOpen(true);
    } else {
      setIsActionOpen(false);

      if (cell.isPlayer) {
        console.log(cell.user);
      } else {
        const userIndex = users.findIndex((user) => user.id === currentUser.id);

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
    }
  };

  return (
    <div className={cell && handleClassname(cell)} onClick={handleClick}>
      {isPlayer && <img src={cell.avatar} alt='avatar' />}
    </div>
  );
}
