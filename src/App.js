import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { ReactComponent } from '*.svg';
import TicTacToe from './Components/tictactoe.js';
import TicTacToeImg from './Components/tictactoe.PNG';
import ConnectFour from './Components/connectfour.js';
import ConnectFourImg from './Components/connect-4.PNG';
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <div className="App">

          {/* sidebar navigation links between games */}
          <div style={{textAlign:"center",marginRight:"auto",marginLeft:"auto"}}>
            <a href="/tictactoe"><div style={{marginRight:"auto",marginLeft:"auto",position:"relative",display:"inline-block",width:"50px",height:"50px",padding:"5px",margin:"5px",border:"solid 1px black",backgroundPosition:"center",backgroundSize:"cover",backgroundImage:"url(" + TicTacToeImg + ")"}}></div></a>
            <a href="/connectfour"><div style={{marginRight:"auto",marginLeft:"auto",position:"relative",display:"inline-block",width:"50px",height:"50px",padding:"5px",margin:"5px",border:"solid 1px black",backgroundPosition:"center",backgroundSize:"cover",backgroundImage:"url(" + ConnectFourImg + ")"}}></div></a>
          </div>

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
