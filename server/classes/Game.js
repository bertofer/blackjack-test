'use strict'
let Deck = require('./Deck')

class Game {
  // player here is the starter of the game
  constructor (player) {
    this.players = [player]
    this.deck = new Deck()
    this.state = 'hold'
    this.waitingPlayers = []
  }

  startGame () {
    this.dech.shuffle()
  }

  addPlayer (player) {
    if (this.state === 'hold') {
      this.players.push(player)
    } else {
      this.waitingPlayers.push(player)
    }
  }

}

module.exports = Game
