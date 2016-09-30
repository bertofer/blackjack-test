'use strict'
let Card = require('./Card')
let arrayShuffle = require('array-shuffle')
let debug = require('debug')('bj:Deck')

class Deck {
  constructor () {
    this.cards = []
    this.restore()
  }

  shuffle () {
    this.cards = arrayShuffle(this.cards)
  }

  restore () {
    let colours = Deck.getColours()
    let numbers = Deck.getNumbers()
    colours.forEach(colour => {
      numbers.forEach(numb => {
        this.cards.push(new Card(numb, colour))
      })
    })
  }

  getCard () {
    return this.cards.shift()
  }

  print () {
    this.cards.forEach(card => {
      debug(card.toString())
    })
  }

  // Statics method
  static getColours () {
    return ['clubs', 'diamonds', 'hearts', 'spades']
  }

  // We will assume J = 10, Q = 11, K = 12
  static getNumbers () {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
}

module.exports = Deck
