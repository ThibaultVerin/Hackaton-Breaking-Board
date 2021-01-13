import React, { useState } from 'react';
import './App.scss';
import { drawBoard, wall, createBoard } from './components/Board/Board';
import Home from './components/Home/Home.js';

function App() {
  const [board, setBoard] = useState(createBoard(wall));
  console.log(board);
  return (
    <div className='App'>
      <div className='board-container'>{drawBoard(board)}</div>
    </div>
  );
}

export default App;
