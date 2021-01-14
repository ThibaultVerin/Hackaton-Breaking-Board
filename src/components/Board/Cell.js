import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Cell(props) {
  const { cellStyle, isPlayer, cell } = props;
  const { users, setUsers, currentUser, setCurrentUser, socket } = useContext(
    UserContext
  );
  let newCurrentUser = {};
  const handleClick = (e) => {
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

    // const newUsersArray = users.filter((user) => user.id !== currentUser.id);

    // newUsersArray.push(newCurrentUser);

    // // const [firstUser, rest] = users;
    // // const newArr = [current, rest];
    // console.log(newUsersArray);
    // setCurrentUser(newCurrentUser);
    // setUsers(newUsersArray);
    socket.emit('currentUserMove', newCurrentUser);
  };

  // useEffect(() => {
  //   socket.on('currentUserMove', currentUser);
  // }, [currentUser]);

  return (
    <div className={cellStyle} onClick={handleClick}>
      {isPlayer && (
        <img
          src={cell.avatar}
          alt='avatar'
          // style={{
          //   top: position.y,
          //   left: position.left,
          //   right: position.right,
          //   position: 'absolute',
          // }}
        />
      )}
    </div>
  );
}
