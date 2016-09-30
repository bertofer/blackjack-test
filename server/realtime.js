'use strict'
let Player = require('./classes/Player')
let Game = require('./classes/Game')
let debug = require('debug')('bj:realtime')
let uuid = require('node-uuid')

module.exports = function (io) {
  let games = []

  function sendGameState (game) {
    // console.log(io.sockets.adapter.rooms[game.id])
    Object.keys(io.sockets.adapter.rooms[game.id].sockets).forEach(function (socket_id) {
      io.sockets.connected[socket_id].emit('state', game.state(socket_id))
    })
  }

  io.on('connection', function (socket) {
    socket.emit('player_id', socket.id)

    socket.emit('rooms',
      { rooms: io.sockets.adapter.rooms ? Object.keys(io.sockets.adapter.rooms) : [] })

    socket.on('disconnected', function (id) {
      debug('a socket has been disconnected, ', this.id) // works?
    })

    socket.on('connect-room', function (room) {
      let rooms = io.sockets.adapter.rooms
      room = room || uuid.v4()
      if (rooms && rooms[room]) {
        // Check if player already exists in room
        let game = games.find(game => game.id === rooms[room].game_id)
        if (!rooms[room].sockets[this.id]) {
          debug('added to the room')
          socket.join(room)
          let player = new Player(socket.id)
          game.addPlayer(player)
        }
        sendGameState(game)
      } else {
        socket.join(room)
        let player = new Player(socket.id)
        let game = new Game(room, player)
        games.push(game)
        rooms[room].game_id = game.id
        io.sockets.emit('rooms', {rooms: Object.keys(rooms)})
        sendGameState(game)
      }
    })

    socket.on('start-game', function (game_id) {
      console.log(socket.rooms)
      let rooms = io.sockets.adapter.rooms
      if (rooms[game_id]) {
        let game = games.find(game => game.id === game_id)
        if (game.admin === this.id) {
          game.startGame()
          sendGameState(game)
        }
      }
    })

    socket.on('ask-card', function (data) {
      let game = games.find(game => game.id === data.game)
      game.askCard(this.id)
      sendGameState(game)
    })

    socket.on('hold', function (data) {
      let game = games.find(game => game.id === data.game)
      game.hold(this.id)
      sendGameState(game)
    })

    debug('going to emit the following rooms')
  })
}
