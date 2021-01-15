import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './CurrentUser.scss';

const CurrentUser = () => {
  const { currentUser } = useContext(UserContext);

  const userLife = currentUser.life * 1.5;
  console.log(currentUser.life * 1.5);
  console.log(userLife);

  return (
    <div className='user-container'>
      <div className='user-info'>
        {' '}
        <img src={currentUser.avatar} />
        <h3>{currentUser.name}</h3>
      </div>
      <div className='user-data'>
        <div className='lifeContainer'>
          <div
            className='lifeBar'
            style={{
              width: `${userLife}px`,
            }}
          />
        </div>
        <div className={currentUser.nerf <= 3 && 'count-nerf'}>
          {currentUser.nerf} nerfs
        </div>
      </div>
    </div>
  );
};

export default CurrentUser;
