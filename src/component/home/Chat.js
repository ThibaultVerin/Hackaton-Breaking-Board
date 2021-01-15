import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../Chat.scss';

const CoffeeChat = () => {
  const { currentUser, socket } = useContext(UserContext);
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
      <h2 className='title-chat'>Let's chat!</h2>
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
            placeholder='Say something...'
          />
          <button className='button-chat' type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoffeeChat;
