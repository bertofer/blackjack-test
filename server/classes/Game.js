'use strict'
let Deck = require('./Deck')

class Game {
  // player here is the starter of the game
  constructor (id, player) {
    this.id = id
    this.admin = player.id // Only one that can start the game
    this.players = [player]
    this.deck = new Deck()
    this.step = 'waiting-players'
    this.waitingPlayers = [] // Entered the game later
    this.currentPlayer = null
  }

  get players () {
    if (this.step !== 'finished') {

    } else {

    }
  }

  startGame () {
    this.dech.shuffle()
    this.step = 'playing'
  }

  addPlayer (player) {
    if (this.step === 'waiting-players') {
      this.players.push(player)
    } else {
      this.waitingPlayers.push(player)
    }

    return this.state()
  }

  holds () {
    this.currentPlayer = this.players[this.players.findIndex(player => player.id === this.currentPlayer) + 1].id
    if (!this.currentPlayer) {
      // Game finished?
      return this.state()
    } else {
      return this.state()
    }
  }

  asksCard () {
    // if overpassed 21, automatically eliminated

  }

  state () {
    return {
      id: this.id,
      admin: this.admin,
      step: this.step,
      players: this.players.map(player => player.id),
      waitingPlayers: this.waitingPlayers.map(player => player.id),
      currentPlayer: this.currentPlayer
    }
  }
}

module.exports = Game
