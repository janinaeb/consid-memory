import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    const card = this.props.card
    const onCardOpen = this.props.onCardOpen
    const { id, pairClass, isFound, isOpen } = card

    let classes = 'card ' + pairClass + (isFound ? ' found' : isOpen ? ' open' : '')

    return (
      <div className={classes} onClick={() => { onCardOpen(id) } }>
        <div className="card-content">
          <div className="front"></div>
          <div className="back"></div>
        </div>
      </div>
    );
  }
}
