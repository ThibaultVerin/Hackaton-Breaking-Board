import React, { useState, createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isCoffeeTaken, setIsCoffeeTaken] = useState(false);
  const socket = io('http://localhost:5000', {
    autoConnect: false,
  });

  useEffect(() => {
    socket.open();

    // return () => {
    //   socket.disconnect();
    // };
  });

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        isActionOpen,
        setIsActionOpen,
        isCoffeeTaken,
        setIsCoffeeTaken,
        socket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
