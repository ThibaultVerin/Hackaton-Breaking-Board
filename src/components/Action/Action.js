import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './Action.scss';

const Action = () => {
  const [isClicked, setIsClicked] = useState(false);

  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    isCoffeTaken,
    setIsCoffeeTaken,
  } = useContext(UserContext);

  const handleCoffee = () => {
    const currentUserTemp = [];

    const userTemp = [];
    users.forEach((e) => {
      userTemp.push({ name: e.name, avatar: e.avatar, id: e.id });
    });
    userTemp[0].x = 3;
    userTemp[0].y = 0;
    userTemp[1].x = 3;
    userTemp[1].y = 2;

    setIsClicked(true);
    setIsCoffeeTaken(true);
    setUsers(userTemp);
    console.log(users);
  };

  const handleGame = () => {
    const currentUserTemp = [];

    const userTemp = [];
    users.forEach((e) => {
      userTemp.push({ name: e.name, avatar: e.avatar, id: e.id });
    });
    userTemp[0].x = 0;
    userTemp[0].y = 7;
    userTemp[1].x = 0;
    userTemp[1].y = 9;

    setIsClicked(true);
    setUsers(userTemp);
    console.log(users);
  };

  return (
    <div>
      {' '}
      {isClicked ? (
        ''
      ) : (
        <div className='actionMenu'>
          <h3>Choose Your Action</h3>
          <div className='actionLink'>
            <p onClick={handleCoffee}>Drink Coffee</p>
            <p>SHOOT</p>
            <p onClick={handleGame}>Challenge</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Action;
