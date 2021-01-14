import React from 'react';
import './App.scss';
import Board from './components/Board/Board';
import Home from './components/Home/Home.js';
import UserContextProvider from './context/UserContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cell from './components/Board/Cell';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <UserContextProvider>
            <Route exact path='/' component={Home} />
            <Route path='/board' component={Board} />
            <Cell />
          </UserContextProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
