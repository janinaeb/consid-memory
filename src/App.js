import React, { Component } from 'react';
import './App.css';
import Board from './Components/Board'
import Score from './Components/Score'

class App extends Component {
  constructor(){
    super() // Calls the parent constructor (Component)
    
    // Bind these class functions to this class to be able to reference 'this'
    this.updateScore = this.updateScore.bind(this)
    this.onGameWon = this.onGameWon.bind(this)
  }

  // Set our default state
  state = {
    score: 0,
    gameWon: false
  }

  // Functions that are being executed in child components to update this component's state
  updateScore(newScore) {
    const newState = { ...this.state, score: newScore }
    this.setState(newState)
  }

  onGameWon() {
    const newState = { ...this.state, gameWon: true }
    this.setState(newState)
  }

  // React specific function that returns what to render when calling this component
  render() {
    return (
      <div className="App">
        <h1>Memory</h1>
        <Board score={this.state.score} onGameWon={this.onGameWon} updateScore={this.updateScore} />
        <Score score={this.state.score} />
      </div>
    );
  }
  
}

export default App;
