'use strict'

class Player {
  constructor (id) {
    this.id = id
    this.cards = []
  }

  giveCard (card) {
    this.cards.push(card)
  }

  // returns 1 - 21
  punctuation () {
    return this.cards.reduce((prev, card) => {
      return prev + card.numb
    }, 0)
  }
}

module.exports = Player
