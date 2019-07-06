const Game = require('./Game');
const GamePhase = require('./GamePhase')

const games = {}

module.exports = io => {
  const karakuSpace = io.of('/karaku')

  const setupGame = hostSocket => {
    const code = () => Math.round((Math.random() * 25) + 65)
    const roomName = String.fromCharCode(code(), code(), code(), code())
    games[roomName] = new Game(roomName, karakuSpace.to(roomName), hostSocket, endGame)
  }
  const endGame = (name, restart, hostSocket) => {
    delete games[name]
    restart && hostSocket && setupGame(hostSocket)
  }

  karakuSpace.on('connection', socket => {
    console.log('client connected')
    socket.on('player-join', (data, ack) => {
      if (data.name && data.room) {
        const room = data.room.toUpperCase()
        if (games[room]) {
          games[room].addPlayer(socket, data.name)
        } else {
          ack({ error: { msg: 'No game with that name' } })
        }
      } else {
        ack({ error: { msg: 'invalid data' } })
      }
    })

    socket.on('host-join', room => {
      let game = games[room]
      if (game) {
        game.addHost(socket)
      } else {
        setupGame(socket)
      }
    })
  })
}