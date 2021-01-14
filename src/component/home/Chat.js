import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../context/UserContext';
import '../Chat.scss';

const CoffeeChat = () => {
  const { users, setUsers, currentUser, setCurrentUSer, socket } = useContext(
    UserContext
  );
  const [messageArray, setMessageArray] = useState([]);
  const [message, setMessage] = useState('');
  console.log(socket);
  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      receivedMessage(message);
    });
  }, []);

  const receivedMessage = (message) => {
    setMessageArray((oldMsgs) => [...oldMsgs, message]);
  };
  console.log(currentUser);
  const sendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      body: message,
      name: currentUser.name,
    };
    setMessage('');
    socket.emit('send message', messageObject);
  };

  const handleChatChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className='ChatContainer'>
      Let's chat !
      {messageArray.map((message, index) => {
        return (
          <p key={index}>
            {message.name}: {message.body}
          </p>
        );
      })}
      <div className='textZone'>
        <form onSubmit={sendMessage}>
          <textarea
            onChange={handleChatChange}
            placeholder='say something...'
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default CoffeeChat;
