import React, { useContext } from 'react';
import avatar from '../../avatar.jpeg';
import { UserContext } from '../../context/UserContext';

export default function Cell(props) {
  const { cellStyle, isPlayer, cell } = props;
  const { users, setUsers } = useContext(UserContext);
  let current = {};
  const handleClick = (e) => {
    current = {
      // eslint-disable-next-line no-restricted-globals
      name: users.name,
      avatar: users.avatar,
      x: cell.x,
      y: cell.y,
    };
    console.log(users);
    console.log(current);
  };
  console.log(users.name);
  return (
    <div className={cellStyle} onClick={handleClick}>
      {isPlayer && (
        <img
          src={avatar}
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
