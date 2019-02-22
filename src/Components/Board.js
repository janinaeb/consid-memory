import React, { Component } from 'react';
import Card from './Card'
import GameLogic from '../GameLogic'

export default class Board extends Component {
  constructor() {
    super() // Calls the parent constructor (Component)
    
    this.gameLogic = new GameLogic()

    // Set our default state
    this.state = {
      cards: this.gameLogic.initCards()
    }

    // Bind functions to this class, to be able to reference 'this'
    this.onCardOpen = this.onCardOpen.bind(this)
  }

  onCardOpen(cardId) {
    // Fetch the cards saved in our state
    let cards = this.state.cards

    const card = cards.find(c => c.id === cardId)
    if (card === undefined) { // Card not found, don't do anything
      return
    }

    // Check if open cards should be resetted
    let isMatch = false
    const numberOfOpenCards = this.gameLogic.numberOfOpenCards(cards)

    if (numberOfOpenCards >= 2) {
      cards = this.gameLogic.closeCards(cards)
    } else {
      // Is matching card also open?
      isMatch = this.gameLogic.isCardMatch(card, cards)
      if (isMatch) {
        cards = this.gameLogic.setCardsFound(cards, card.pairId)
      }
    }

    if (!isMatch) {
      // Open the card and keep playing
      cards = this.gameLogic.openCard(cardId, cards)
    }

    // Update our state with the modified cards
    this.setState({
      cards
    })

    // Update the score
    if ((numberOfOpenCards + 1) === 2){
      let { score } = this.props;
      score++
      this.props.updateScore(score)
    }

    // Check if player has won
    if (isMatch && this.gameLogic.isGameWon(cards)) {
      this.props.onGameWon()
    }
  }

  render() {
    return (
      <div className="board">
        {this.state.cards.map(card => 
          <Card 
            key={card.id}
            card={card} 
            onCardOpen={this.onCardOpen} 
          />
        )}
      </div>
    );
  }
}
