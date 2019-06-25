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
    this.playerOrder = false
    this.turn = -1
    this.currPlayer = 0
    this.prompts = ['blue shoe', 'desperate housewife', 'among the bears', 'fortuitous shepherd', 'free the penguin horde', 'jesus slept', 'bugatti jones'],
    this.countdown = 5
    this.countdownTimer
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
    this.host.socket.emit('host-sync', {
      phase: this.phase,
      players: this.players,
      countdown: this.countdown,
      currPlayer: this.currPlayer,
    })
  }

  addPlayer(socket, name) {
    const isLeader = this.players.length === 0
    const player = new Player(socket, name, isLeader)
    this.registerPlayerListeners(player)
    this.players.push(player)
    if (this.host) this.host.socket.emit('host-sync', { players: this.players })
    return player
  }
  registerPlayerListeners(player) {
    const { socket } = player
    socket.on('start-game', () => {
      if (this.phase === 0 && this.host) {
        this.startDrawingPhase()
      }
    })

    socket.on('submit-drawing', (drawing, ack) => {
      if (player.drawing.length === 0 && drawing.length > 0) {
        player.drawing = drawing
        if (this.players.reduce((acc, curr) => acc && (curr.drawing.length !== 0), true)) { //if all players have submitted drawings
          this.startGuessingPhase()
        }
        ack({ isDrawingSubmitted: true })
      } else {
        ack({ error: { msg: `already have drawing or got no drawing for player ${player.name}`}})
      }
    })

    socket.on('submit-guess', (guess, ack) => {
      if (player.guess === '') {
        player.guess = guess
        if (this.players.reduce((acc, curr) => acc && (curr.guess !== ''), true)) {
          this.startPickingPhase()
        }
        ack({ isGuessSubmitted: true })
      } else {
        ack({ error: { msg: `already have guess for player ${player.name}`}})
      }
    })

    socket.on('submit-pick', (pick, ack) => {
      if (player.pick === '') {
        player.pick = pick
        if (this.players.reduce((acc, curr) => acc && (curr.pick !== ''), true)) {
          this.startScoreboardPhase()
        }
        ack({ isPickSubmitted: true })
      } else {
        ack({ error: { msg: `already have pick for player ${player.name}` } })
      }
    })
  }

  startDrawingPhase() {
    this.phase = GamePhase.DRAWING
    this.syncHost()
    this.startCountdown()
    const pickedPrompts = []
    this.players.forEach(player => {
      let promptIndex
      do {
        promptIndex = Math.floor(Math.random() * this.prompts.length)
      } while (pickedPrompts.includes(promptIndex))
      pickedPrompts.push(promptIndex)
      player.socket.emit('player-sync', { phase: GamePhase.DRAWING, prompt: this.prompts[promptIndex] })
    })
  }

  startGuessingPhase() {
    if (!this.playerOrder) {
      this.playerOrder = Array(this.players.length).fill(0).map((e, i) => i)
      for (let i = this.playerOrder.length-1; i != 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const t = this.playerOrder[i]
        this.playerOrder[i] = this.playerOrder[j]
        this.playerOrder[j] = t
      }
    }
    this.phase = GamePhase.GUESSING
    this.currPlayer = this.playerOrder[++this.turn]
    this.startCountdown()
    this.io.emit('player-sync', { phase: this.phase })
    this.syncHost()
  }

  startPickingPhase() {
    this.phase = GamePhase.PICKING
    this.startCountdown()
    const pickPhaseData = {
      phase: this.phase,
      guesses: this.players.map(p => ({ name: p.name, text: p.guess }))
    }
    this.io.emit('player-sync', pickPhaseData)
    this.syncHost()
  }

  startScoreboardPhase() {
    this.phase = GamePhase.SCOREBOARD
    this.io.emit('player-sync', { phase: this.phase })
    this.syncHost()
  }

  startCountdown() {
    clearInterval(this.countdownTimer)
    this.countdown = 5
    this.countdownTimer = setInterval(() => {
      if (this.countdown-- <= 0) {
        clearInterval(this.countdownTimer)
        switch(this.phase) {
          case GamePhase.DRAWING:
            this.startGuessingPhase()
            break
          case GamePhase.GUESSING:
            this.startPickingPhase()
            break
          case GamePhase.PICKING:
            this.startScoreboardPhase()
            break
        }
      }
      this.syncHost()
    }, 1000)
  }
}
module.exports = Game