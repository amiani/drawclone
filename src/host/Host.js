const GamePhase = require('../GamePhase')

module.exports = class Host {
  constructor(socket, players) {
    this.socket = socket
    this.players = players
    this.phase = GamePhase.LOBBY
    console.log('host connected')
  }

  toJSON() {
    return {
      phase: this.phase,
    }
  }
}