import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Action.scss';
import addNotification from 'react-push-notification';

const Action = (props) => {
  const { users, setUsers, currentUser, setCurrentUser } = useContext(
    UserContext
  );

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

    setUsers(userTemp);
    console.log(users);
  };

  const buttonClick = () => {
    addNotification({
      title: 'Message:',
      subtitle: 'Coffee break',
      message: 'Wanna get a coffee?',
      native: true,
      duration: 5000,
    });
  };

  return (
    <div>
      <h3>Choose Your Action</h3>
      <div>
        <div
          onClick={() => {
            handleCoffee();
            buttonClick();
          }}
        >
          Drink Coffee
        </div>
        <div onClick={buttonClick}>SHOOT</div>
        <div onClick={buttonClick}>Challenge + name</div>
      </div>
    </div>
  );
};

export default Action;
