const GamePhase = require('./GamePhase')
const Player = require('./player/Player')
const Host = require('./host/Host')

class Game {
  //Game could take a socketio namespace (or similar) in constructor and manage all its own connections
  constructor(roomName, io) {
    this.roomName = roomName
    this.io = io
    this._phase = GamePhase.LOBBY
    this.host = false
    this.players = []
    this.prompts = ['blue shoe', 'desperate housewife', 'among the bears', 'fortuitous shepherd', 'free the penguin horde', 'jesus slept', 'bugatti jones']
  }

  get phase() { return this._phase }
  set phase(phase) {
    this._phase = phase
    this.host.phase = phase
  }

  addHost(socket) {
    this.host = new Host(socket, this.players)
    this.registerHostListeners(this.host.socket)
    return this.host
  }

  registerHostListeners(socket) {

  }

  syncHost() {
    this.host.socket.emit('sync', {
      phase: this.phase,
      players: this.players,
    })
  }

  addPlayer(socket, name) {
    const isLeader = this.players.length === 0
    const player = new Player(socket, name, isLeader)
    this.registerPlayerListeners(player)
    this.players.push(player)
    if (this.host) this.host.socket.emit('player-joined', { players: this.players })
    return player
  }
  registerPlayerListeners(player) {
    const { socket } = player
    socket.on('start-game', () => {
      if (this.phase === 0 && this.host) {
        this.phase = GamePhase.DRAWING
        this.io.clients((err, clients) => {
          if (err) throw err

          const pickedPrompts = []
          clients.forEach(clientId => {
            let promptIndex
            do {
              promptIndex = Math.floor(Math.random() * this.prompts.length)
            } while (pickedPrompts.includes(promptIndex))
            pickedPrompts.push(promptIndex)
            this.io.to(`${clientId}`).emit('change-phase', { phase: GamePhase.DRAWING, prompt: this.prompts[promptIndex] })
          })
        })
      }
    })

    socket.on('submit-drawing', (drawing, ack) => {
      if (player.drawing.length === 0 && drawing.length > 0) {
        player.drawing = drawing
        if (this.players.reduce((acc, curr) => acc && (curr.drawing.length !== 0), true)) {  //if all players have submitted drawings
          this.phase = GamePhase.GUESSING
          this.io.emit('change-phase', { phase: this.phase })
          this.syncHost()
        }
        ack({ isDrawingSubmitted: true })
      } else {
        ack({ error: { msg: `already have drawing or got no drawing for player ${player.name}`}})
      }
    })

    socket.on('submit-guess', (guess, ack) => {
      if (player.guess === '') {
        player.guess = guess
        if (this.players.reduce((acc, curr) => acc && curr.guess !== ''), true) {
          this.phase = GamePhase.PICKING
          const pickPhaseData = {
            phase: this.phase,
            guesses: this.players.map(p => ({ name: p.name, text: p.guess }))
          }
          this.io.emit('change-phase', pickPhaseData)
        }
        ack({ isGuessSubmitted: true })
      } else {
        ack({ error: { msg: `already have guess for player ${player.name}`}})
      }
    })

    socket.on('submit-pick', (pick, ack) => {
      if (player.pick === '') {
        player.pick = pick
        if (this.players.reduce((acc, curr) => acc && curr.pick !== ''), true) {
          this.phase = GamePhase.SCOREBOARD
          this.io.emit('change-phase', { phase: this.phase })
        }
        ack({ isPickSubmitted: true })
      } else {
        ack({ error: { msg: `already have pick for player ${player.name}` } })
      }
    })
  }
}
module.exports = Game