import React from 'react';
import './App.scss';
import Board from './components/Board/Board';
import Home from './components/Home/Home.js';
import UserContextProvider from './context/UserContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Notifications } from 'react-push-notification';
import Play from './components/Shifoumi/Play';

function App() {
  return (
    <div className='App'>
      <Notifications />

      <Router>
        <Switch>
          <UserContextProvider>
            <Route exact path='/' component={Home} />
            <Route path='/board' component={Board} />
            <Route path='/game' component={Play} />
          </UserContextProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
