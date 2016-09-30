'use strict'
let Deck = require('./Deck')

class Game {
  // player here is the starter of the game
  constructor (id, player) {
    this.id = id
    this.admin = player.id // Only one that can start the game
    this._players = [player]
    this.deck = new Deck()
    this.step = 'waiting-players'
    this.waitingPlayers = [] // Entered the game later
    this.currentPlayer = null
  }

  players (player_id) {
    return this._players.map(player => {
      if (player.id === player_id || this.step === 'finished') {
        return {
          id: player.id,
          cards: player.cards.map(card => card.toString()),
          punctuation: player.punctuation
        }
      } else {
        return {
          id: player.id,
          cards: player.cards.length,
          punctuation: 'too soon to know'
        }
      }
    })
  }

  startGame () {
    this.deck.shuffle()
    // Give each player 2 cards
    this._players.forEach(player => {
      player.giveCard(this.deck.getCard())
      player.giveCard(this.deck.getCard())
    })
    this.step = this._players[0].id
  }

  addPlayer (player) {
    if (this.step === 'waiting-players') {
      this._players.push(player)
    } else {
      this.waitingPlayers.push(player)
    }
    return this.state()
  }

  holds () {
    this.currentPlayer = this._players[this.players.findIndex(player => player.id === this.currentPlayer) + 1].id
    if (!this.currentPlayer) {
      // Game finished?
      return this.state()
    } else {
      return this.state()
    }
  }

  askCard (player_id) {
    // if overpassed 21, automatically eliminated
    let player = this._players.find(player => player.id === player_id)
    if (player_id === this.step) {
      player.giveCard(this.deck.getCard())
      if (player.punctuation > 21) {
        this.hold(player_id)
      }
    }
  }

  hold (player_id) {
    if (this.step === player_id) {
      let index = this._players.findIndex(player => player.id === player_id)
      if (index < this._players.length - 1) {
        this.step = this._players[index + 1].id
      } else {
        this.step = 'finished'
      }
    }
  }

  // Depending player id will see it's cards or not
  state (player_id) {
    return {
      id: this.id,
      admin: this.admin,
      step: this.step,
      players: this.players(player_id),
      waitingPlayers: this.waitingPlayers.map(player => player.id)
      // currentPlayer: this.currentPlayer
    }
  }
}

module.exports = Game
