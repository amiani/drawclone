const store = require('./store');
const GamePhase = require('./GamePhase')
const Player = require('./player/Player')

module.exports = io => {
  io.on('connection', socket => {
    console.log('player client connected')
    socket.on('player-join', (data, cb) => {
      if (data && store.phase === GamePhase.LOBBY) {
        const isLeader = store.players.length === 0
        const player = new Player(data, isLeader)
        store.players.push(player)
        console.log(`${data} joined`)
        cb(player)
      } else {
        cb(false)
      }
    })

    socket.on('start-game', () => {
      if (store.phase === 0) {
        store.phase = GamePhase.DRAWING
        io.emit('phase-change', store.phase)
      }
    })
  })
}