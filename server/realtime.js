'use strict'
let Player = require('./classes/Player')
let Game = require('./classes/Game')
let debug = require('debug')('bj:realtime')
let uuid = require('node-uuid')

module.exports = function (io) {
  let games = []

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
        socket.emit('state', game.state())
      } else {
        socket.join(room)
        let player = new Player(socket.id)
        let game = new Game(room, player)
        games.push(game)
        rooms[room].game_id = game.id
        io.sockets.emit('rooms', {rooms: Object.keys(rooms)})
        socket.emit('state', game.state())
      }
    })

    socket.on('start-game', function (id) {
      if (socket.rooms[0] && (socket.rooms[0].game.admin === id)) {
        let stateGame = socket.rooms[0].game.startGame()
        io.to(socket.rooms[0]).emit(stateGame)
      }
    })

    debug('going to emit the following rooms')
  })
}
