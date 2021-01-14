import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Cell(props) {
  const { cellStyle, isPlayer, cell } = props;
  const { users, setUsers } = useContext(UserContext);
  let current = {};
  const handleClick = (e) => {
    current = {
      // eslint-disable-next-line no-restricted-globals
      name: users[0].name,
      avatar: users[0].avatar,
      id: users[0].id,
      x: cell.x,
      y: cell.y,
    };
    const [currentUser, rest] = users;
    const newArr = [current, rest];
    console.log(rest);

    console.log(users);
    console.log(current);
    setUsers(newArr);
  };
  console.log(users.name);
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
