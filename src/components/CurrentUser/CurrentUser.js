import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './CurrentUser.scss';

const CurrentUser = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className='user-container'>
      <img src={currentUser.avatar} />
      <div>
        <div>{currentUser.name}</div>
        <div>{currentUser.life}/100</div>
        <div>{currentUser.nerf} nerfs</div>
      </div>
    </div>
  );
};

export default CurrentUser;
