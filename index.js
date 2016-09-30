'use strict'
let debug = require('debug')('bj:main')
let express = require('express')

let app = express()
// Serve angular
app.use(express.static(__dirname + '/client/dist'))
let server = app.listen(3000)

let io = require('socket.io').listen(server)

// configure realtime game server
let realtimeServer = require('./server/realtime')
realtimeServer(io)

debug('Express server listening on port 3000')
