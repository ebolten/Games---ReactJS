import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { ReactComponent } from '*.svg';
import TicTacToe from './Components/tictactoe.js';
import ConnectFour from './Components/connectfour.js';
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <TicTacToe />
            </Route>
            <Route path="/tictactoe">
              <TicTacToe />
            </Route>
            <Route path="/connectfour">
              <ConnectFour />
            </Route>
            <Route path="/">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Learn React
                </a>
              </header>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
