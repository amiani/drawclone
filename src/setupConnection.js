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
      if (!game.host && game.phase === GamePhase.LOBBY) {
        const host = game.addHost(socket)
        ack(host)
      } else {
        ack({ error: { msg: 'there already is a host or wrong phase' } })
      }
    })
  })
}