import React, { useState, createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
