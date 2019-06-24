const store = require('./store');
const GamePhase = require('./GamePhase')
const Player = require('./player/Player')

module.exports = io => {
  io.on('connection', socket => {
    console.log('player client connected')
    let player
    socket.on('player-join', (data, ack) => {
      if (data && store.phase === GamePhase.LOBBY) {
        const isLeader = store.players.length === 0
        player = new Player(data, isLeader)
        store.players.push(player)
        console.log(`${data} joined`)
        ack(player)
      } else {
        ack({ error: { msg: 'invalid player data or tried to join in wrong phase'}})
      }
    })

    socket.on('start-game', () => {
      if (store.phase === 0) {
        store.phase = GamePhase.DRAWING
        io.clients((err, clients) => {
          if (err) throw err
          const pickedPrompts = []
          clients.forEach(clientId => {
            let promptIndex
            do {
              promptIndex = Math.floor(Math.random() * store.prompts.length)
            } while (pickedPrompts.includes(promptIndex))
            pickedPrompts.push(promptIndex)
            io.to(`${clientId}`).emit('change-phase', { phase: GamePhase.DRAWING, prompt: store.prompts[promptIndex] })
          })
        })
      }
    })

    socket.on('submit-drawing', (drawing, ack) => {
      if (player.drawing.length === 0) {
        player.drawing = drawing
        ack({ isDrawingSubmitted: true })
      } else {
        ack({ error: { msg: `already have drawing for player ${player.name}`}})
      }
    })
  })
}