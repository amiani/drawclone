const Game = require('./Game');
const GamePhase = require('./GamePhase')

module.exports = io => {
  const game = new Game('drawclone', io)
  io.on('connection', socket => {
    console.log('client connected')
    socket.on('player-join', (name, ack) => {
      if (name && game.phase === GamePhase.LOBBY) {
        const player = game.addPlayer(socket, name)
        ack(player)
      } else {
        ack({ error: { msg: 'invalid player data or tried to join in wrong phase'}})
      }
    })

    socket.on('host-join', (data, ack) => {
      if (game.host) {
        game.host.socket = socket
        ack(game.host)
        game.syncHost()
      } else {
        const host = game.addHost(socket)
        ack(host)
        game.syncHost()
      }
    })

    socket.on('host-end-scoreboard-phase', () => {
      game.endScoreboardPhase()
    })
  })
}