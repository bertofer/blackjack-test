import angular from 'angular'
import io from 'socket.io-client'

const uuid_re = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)

class Network {
  constructor ($rootScope) {
    this.$rootScope = $rootScope
    this.player_id

    this.socket = io('http://localhost:3000')
    this.rooms = []
    this.game = {}
    this._initEventHandlers()
  }

  _initEventHandlers () {
    let socket = this.socket
    let self = this // The class to reference inside socket handlers

    socket.on('connect', function () {
      console.log('Connected!')
    })

    socket.on('player_id', function (player_id) {
      self.$rootScope.$apply(function () {
        self.player_id = player_id
      })
    })

    socket.on('rooms', function (data) {
      self.$rootScope.$apply(function () {
        let rooms = data.rooms
        if (rooms) {
          self.rooms = rooms.filter(room => uuid_re.test(room))
          console.log(self.rooms)
        }
        console.log('received rooms!', rooms)
      })
    })


    socket.on('state', function (data) {
      self.$rootScope.$apply(function () {
        console.log('received state!', data)
        self.game = data
        console.log(data)
      })
    })

    socket.on('disconnect', function () {

    })
  }

  connectRoom (room) {
    if (room) {
      console.log('connect room', room)
      this.socket.emit('connect-room', room)
    } else {
      this.socket.emit('connect-room')
    }
  }

  startGame () {
    this.socket.emit('start-game', this.game.id)
  }

  askCard () {
    this.socket.emit('ask-card', {game: this.game.id})
  }

  hold () {
    this.socket.emit('hold', {game: this.game.id})
  }
}

Network.$inject = ['$rootScope']

export default angular.module('services', [])
  .service('network', Network)
  .name
