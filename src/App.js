import React, { Component } from 'react';
import './App.css';
import Board from './Components/Board'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Memory</h1>
        <Board />
      </div>
    );
  }
}

export default App;
