'use strict'
module.exports = function(io) {
  let Game = require('./classes/Game')
  let Deck = require('./classes/Deck')

  let deck = new Deck()
  deck.print()
  // io.on('connection', )
}
