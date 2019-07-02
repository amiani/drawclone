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
    this.currPlayerIndex = -1
    this.prompts = ['blue shoe', 'desperate housewife', 'among the bears', 'fortuitous shepherd', 'free the penguin horde', 'jesus slept', 'bugatti jones'],
    this.countdown = 30
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

  syncPlayers() {
    this.players.forEach(player => player.socket.emit('player-sync', player))
  }
  syncHost() {
    this.host.socket.emit('host-sync', {
      phase: this.phase,
      players: this.players,
      countdown: this.countdown,
      currPlayerIndex: this.currPlayerIndex,
      titles: this.players.map(p => p.isCurrPlayer ? p.prompt : p.title)
    })
  }

  addPlayer(socket, name) {
    const isLeader = this.players.length === 0
    const player = new Player(socket, name, isLeader, ()=>this.phase)
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
        player.isDrawingSubmitted = true
        ack({ isDrawingSubmitted: true })
        if (this.players.reduce((acc, curr) => acc && curr.isDrawingSubmitted, true)) { //if all players have submitted drawings
          this.startTitlingPhase()
        }
      } else {
        ack({ error: { msg: `already have drawing or got no drawing for player ${player.name}`}})
      }
    })

    socket.on('submit-title', (title, ack) => {
      if (player.title === '') {
        player.title = title
        player.isTitleSubmitted = true
        ack({ isTitleSubmitted: true })
        if (this.players.reduce((acc, curr) => acc && curr.isTitleSubmitted, true)) {
          this.startPickingPhase()
        }
      } else {
        ack({ error: { msg: `already have title for player ${player.name}`}})
      }
    })

    socket.on('submit-pick', (pick, ack) => {
      if (player.pick === '') {
        player.pick = pick
        player.isPickSubmitted = true
        ack({ isPickSubmitted: true })
        if (this.players.reduce((acc, curr) => acc && curr.isPickSubmitted, true)) {
          this.startScoreboardPhase()
        }
      } else {
        ack({ error: { msg: `already have pick for player ${player.name}` } })
      }
    })

    socket.on('restart-game', () => {
      this.turn = -1
      this.playerOrder = false
      this.players.forEach(player => {
        player.score = 0
        player.drawing = []
        player.isDrawingSubmitted = false
        player.isTitleSubmitted = false
        player.isPickSubmitted = false
      })
      this.countdown = 30
      this.syncPlayers()
      this.startDrawingPhase()
    })

    socket.on('new-players', () => {
      this.phase = GamePhase.LOBBY
      this.io.emit('player-sync', { phase: this.phase })
    })
  }

  startDrawingPhase() {
    clearInterval(this.countdownTimer)
    this.phase = GamePhase.DRAWING
    this.syncHost()
    this.startCountdown(30)
    const pickedPrompts = []
    this.players.forEach(player => {
      let promptIndex
      do {
        promptIndex = Math.floor(Math.random() * this.prompts.length)
      } while (pickedPrompts.includes(promptIndex))
      pickedPrompts.push(promptIndex)
      player.prompt = this.prompts[promptIndex]
      player.socket.emit('player-sync', { phase: GamePhase.DRAWING, prompt: player.prompt })
    })
  }

  startTitlingPhase() {
    clearInterval(this.countdownTimer)
    if (!this.playerOrder) {
      this.playerOrder = Array(this.players.length).fill(0).map((e, i) => i)
      for (let i = this.playerOrder.length-1; i != 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const t = this.playerOrder[i]
        this.playerOrder[i] = this.playerOrder[j]
        this.playerOrder[j] = t
      }
    }
    this.phase = GamePhase.TITLING
    this.currPlayerIndex = this.playerOrder[++this.turn]
    const currPlayer = this.players[this.currPlayerIndex]
    currPlayer.isTitleSubmitted = true
    currPlayer.isPickSubmitted = true
    currPlayer.isCurrPlayer = true
    this.startCountdown(10)
    this.players.forEach(player => player.socket.emit('player-sync', {
      phase: this.phase,
      isCurrPlayer: player.isCurrPlayer
    }))
    this.syncHost()
  }

  startPickingPhase() {
    clearInterval(this.countdownTimer)
    this.phase = GamePhase.PICKING
    this.startCountdown(5)
    const titles = this.players.map(p => ({
      name: p.name,
      text: p.isCurrPlayer ? p.prompt : p.title
    }))
    this.io.emit('player-sync', { phase: this.phase, titles })
    this.syncHost()
  }

  startScoreboardPhase() {
    clearInterval(this.countdownTimer)
    this.phase = GamePhase.SCOREBOARD
    const currPlayer = this.players[this.currPlayerIndex]
    this.players.forEach(picker => {
      if (picker.pick) {
        const pickedPlayer = this.players.find(p => p.name === picker.pick)
        pickedPlayer.pickers.push(picker.name)
      }
      if (picker !== currPlayer) {
        if (picker.pick === currPlayer.name) {
          currPlayer.score += 1000
          picker.score += 1000
        } else {
          const pickedPlayer = this.players.find(p => p.name === picker.pick)
          pickedPlayer && (pickedPlayer.score += 500)
        }
      }
    })
    this.syncPlayers()
    this.syncHost()
  }

  endScoreboardPhase() {
    this.players.forEach(player => {
      player.isTitleSubmitted = false
      player.isPickSubmitted = false
      player.isCurrPlayer = false
      player.title = ''
      player.pick = ''
      player.pickers = []
    })
    this.syncPlayers()
    if (this.turn >= this.players.length-1)
      this.startEndLobbyPhase()
    else
      this.startTitlingPhase()
  }


  startEndLobbyPhase() {
    clearInterval(this.countdownTimer)
    this.phase = GamePhase.ENDLOBBY
    this.syncPlayers()
    this.syncHost()
  }

  startCountdown(time) {
    clearInterval(this.countdownTimer)
    this.countdown = time
    this.countdownTimer = setInterval(() => {
      if (this.countdown-- <= 0) {
        clearInterval(this.countdownTimer)
        switch(this.phase) {
          case GamePhase.DRAWING:
            this.startTitlingPhase()
            break
          case GamePhase.TITLING:
            this.startPickingPhase()
            break
          case GamePhase.PICKING:
            this.startScoreboardPhase()
            break
          case GamePhase.SCOREBOARD:
            this.endScoreboardPhase()
            break
        }
      }
      this.syncHost()
    }, 1000)
  }
}
module.exports = Game