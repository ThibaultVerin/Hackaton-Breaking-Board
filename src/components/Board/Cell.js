import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { handleClassname } from './Board';
import { useHistory } from 'react-router-dom';

export default function Cell(props) {
  const { isPlayer, cell } = props;
  const { users, setUsers, currentUser, setCurrentUser, socket } = useContext(
    UserContext
  );

  const history = useHistory();

  let newCurrentUser = {};
  const handleClick = (e) => {
    if (cell.isComputer) {
      history.push('/game');
    } else {
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
    }

    socket.emit('currentUserMove', newCurrentUser);
  };
  return (
    <div className={cell && handleClassname(cell)} onClick={handleClick}>
      {isPlayer && <img src={cell.avatar} alt='avatar' />}
    </div>
  );
}
