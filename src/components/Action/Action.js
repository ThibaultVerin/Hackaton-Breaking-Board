import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Action.scss';

const Action = () => {
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

    setIsCoffeeTaken(true);
    setUsers(userTemp);
    console.log(users);
  };

  return (
    <div>
      <h3>Choose Your Action</h3>
      <div>
        <div onClick={handleCoffee}>Drink Coffee</div>
        <div>SHOOT</div>
        <div>Challenge + name</div>
      </div>
    </div>
  );
};

export default Action;
