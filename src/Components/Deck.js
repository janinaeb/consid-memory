
export default class Deck {
  constructor() {
    
    this.pairs = [
      {
        pairId: 1,
        pairClass: 'pair-1'
      },
      {
        pairId: 2,
        pairClass: 'pair-2'
      },
      {
        pairId: 3,
        pairClass: 'pair-3'
      },
      {
        pairId: 4,
        pairClass: 'pair-4'
      }
    ]
  }

  initCards() {
    let cards = []
    let id = 1
    
    // Init each pair as two cards
    for (let i = 0; i < this.pairs.length; i++) {
      const pair = this.pairs[i]

      // Create two cards of each
      for (let p = 0; p < 2; p++) {
        const card = {
          id,
          pairId: pair.pairId,
          pairClass: pair.pairClass,
          isOpen: false,
          isFound: false,
        }
        
        cards.push(card)
        id++  
      }
    }

    // shuffle cards
    cards = this.shuffle(cards)

    return cards
  }

  shuffle(cards) {
    for (let i = 0; i < cards.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards
  }

  shouldCloseOpenCards(cards) {
    const numberOpenedCards = cards.filter(card => card.isOpen).length || 0
    return numberOpenedCards >= 2
  }

  closeCards(cards) {
    return cards.map(card => {
      card.isOpen = false
      return card
    })
  }

  isCardMatch(card, cards) {
    // Check if another card in the same pair is opened.
    return cards.some(c => c.pairId === card.pairId && c.id !== card.id && c.isOpen)
  }

  updateCards(card, cards, pairId) {

  }

  setCardsFound(cards, pairId) {
    // Set found on matching pair, and close all open cards.
    return cards.map(card => {
      if (card.pairId === pairId){
        card.isFound = true
      }
      card.isOpen = false
      return card
    })
  }

  openCard(cardId, cards) {
    return cards.map(card => {
      if (card.isFound){
        return card // Nothing will happen to the card that is found.
      }
      if (card.id === cardId){
        // Open card
        card.isOpen = true
      }
      return card
    })
  }
}
