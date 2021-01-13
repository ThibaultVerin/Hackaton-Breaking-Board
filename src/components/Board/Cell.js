import React, { useState } from 'react';
import avatar from '../../avatar.jpeg';

export default function Cell(props) {
  const { cellStyle, isPlayer } = props;

  return (
    <>
      <div className={cellStyle}>
        {isPlayer && <img src={avatar} alt='avatar' />}
      </div>
    </>
  );
}
