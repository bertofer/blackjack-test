import angular from 'angular'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
}

class AppCtrl {
  constructor ($scope, network) {
    console.log(network)
    this.network = network
  }

  connectRoom (room) {
    this.network.connectRoom(room)
  }

  isGameStarted () {
    return this.network.game.step !== 'waiting-players'
  }

  gameAdmin () {
    return this.network.game.admin === this.network.player_id
  }

  startGame () {
    this.network.startGame()
  }

  getCard () {
    this.network.askCard()
  }

  hold () {
    this.network.hold()
  }
}

AppCtrl.$inject = ['$scope', 'network']

const MODULE_NAME = 'blackjack'

angular.module(MODULE_NAME, ['services'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)

export default MODULE_NAME
