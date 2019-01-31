import React, { Component } from 'react';
import Card from './Card'
import Deck from './Deck'

export default class Board extends Component {
  constructor() {
    super() // Calls the parent constructor (Component)
    
    this.deck = new Deck()

    this.state = {
      cards: this.deck.initCards()
    }

    // Bind functions to this class
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
    const shouldCloseOpenCards = this.deck.shouldCloseOpenCards(cards)

    if (shouldCloseOpenCards) {
      cards = this.deck.closeCards(cards)
    } else {
      // Is matching card also open?
      isMatch = this.deck.isCardMatch(card, cards)
      if (isMatch) {
        cards = this.deck.setCardsFound(cards, card.pairId)
      }
    }

    if (!isMatch) {
      // Open the card and keep playing
      cards = this.deck.openCard(cardId, cards)
    }
   
    // Update our state with the modified cards
    this.setState({
      cards
    })
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
