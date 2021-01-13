import React, { useState } from 'react';
import avatar from '../../avatar.jpeg';

export default function Cell(props) {
  const { cellStyle, isPlayer, cell } = props;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (cell) => {
    console.log(cell);
  };

  return (
    <div className={cellStyle} onClick={() => handleClick(cell)}>
      {isPlayer && (
        <img
          src={avatar}
          alt='avatar'
          style={{
            top: position.y,
            left: position.left,
            right: position.right,
            position: 'absolute',
          }}
        />
      )}
    </div>
  );
}
