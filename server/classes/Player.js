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
  get punctuation () {
    return this.cards.reduce((prev, card) => {
      return prev + (card.numb > 9 ? 10 : card.numb)
    }, 0)
  }
}

module.exports = Player
