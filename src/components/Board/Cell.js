import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { handleClassname } from './Board';
import './Cell.css';

export default function Cell(props) {
  const [isShown, setIsShown] = useState(false);

  const { isPlayer, cell } = props;
  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    isActionOpen,
    setIsActionOpen,
    socket,
  } = useContext(UserContext);

  let newCurrentUser = {};

  const handleClick = (e) => {
    console.log(users);
    console.log(isPlayer);

    if (isPlayer) {
      setIsActionOpen(true);
    } else {
      setIsActionOpen(false);
    }

    const userIndex = users.findIndex((user) => user.id === currentUser.id);

    newCurrentUser = {
      // eslint-disable-next-line no-restricted-globals
      name: users[userIndex].name,
      avatar: users[userIndex].avatar,
      id: users[userIndex].id,
      x: cell.x,
      y: cell.y,
    };

    socket.emit('currentUserMove', newCurrentUser);
  };
  console.log(currentUser.name);

  return (
    <div className={cell && handleClassname(cell)} onClick={handleClick}>
      <div className='display-name'>
        {isShown && <div>{currentUser.name} </div>}
      </div>
      {isPlayer && (
        <img
          src={cell.avatar}
          alt='avatar'
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        />
      )}
    </div>
  );
}
