import React, { useContext } from 'react';
import avatar from '../../avatar.jpeg';
import { UserContext } from '../../context/UserContext';

export default function Cell(props) {
  const { cellStyle, isPlayer, cell } = props;
  const { users, setUsers } = useContext(UserContext);

  const handleClick = (e) => {
    console.log(e.target);
    // const x = e.nativeEvent.clientX,
    //   y = e.nativeEvent.clientY;
    // setUsers({ x, y });
  };

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
