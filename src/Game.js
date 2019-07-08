const GamePhase = require('./GamePhase')
const Player = require('./player/Player')
const Host = require('./host/Host')

class Game {
  constructor(roomName, room, hostSocket, endGame) {
    this.colors = ['#ecebe4', '#80ff72', '#eec0c6', '#e63946', '#565554', '#97cc04', ]
    this.colorIndex = 0
    this.roomName = roomName
    this.room = room
    this._phase = GamePhase.LOBBY
    this.players = []
    this.titles = []
    this.playerOrder = false
    this.turn = -1
    this.currPlayerIndex = -1
    this.prompts = ['seagull stealing a hot dog', 'blue shoe', 'desperate housewife', 'among the bears', 'fortuitous shepherd', 'free the penguin horde', 'jesus slept', 'bugatti jones'],
    this.countdown = 30
    this.countdownTimer
    this.endGame = endGame
    this.addHost(hostSocket)
  }

  get phase() { return this._phase }
  set phase(phase) {
    this._phase = phase
    this.host.phase = phase
  }

  addHost(socket) {
    if (this.host)
      this.host.socket = socket
    else
      this.host = new Host(socket, this.players)
    this.registerHostListeners(this.host.socket)
    this.syncHost()
  }

  registerHostListeners(socket) {
    socket.on('disconnect', reason => {
      this.players.forEach(p => p.socket.emit('player-sync', {
        phase: GamePhase.LOBBY,
        name: '',
      }))
      this.endGame(this.roomName, false)
    })

    socket.on('host-end-scoreboard-phase', () => {
      this.phase === GamePhase.SCOREBOARD && this.endScoreboardPhase()
    })
  }

  syncPlayers() {
    this.players.forEach(player => player.socket.emit('player-sync', player))
  }
  syncHost() {
    this.host.socket.emit('host-sync', {
      phase: this.phase,
      roomName: this.roomName,
      players: this.players,
      countdown: this.countdown,
      currPlayerIndex: this.currPlayerIndex,
      titles: this.titles
    })
  }

  addPlayer(socket, name) {
    let player = this.players.find(e => e.name === name)
    if (player) {
      player.socket = socket
      this.registerPlayerListeners(player)
    } else {
      const isLeader = this.players.length === 0
      player = new Player(socket, name, this.colors[this.colorIndex++], isLeader, ()=>this.phase)
      this.registerPlayerListeners(player)
      this.players.push(player)
      this.syncHost()
    }
    player.socket.emit('player-sync', player)
  }
  registerPlayerListeners(player) {
    const { socket } = player
    socket.on('disconnect', reason => console.log(reason))

    socket.on('start-game', () => {
      if (this.phase === 0 && this.host && this.players.length > 2) {
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
      this.room.emit('player-sync', {
        phase: this.phase,
        name: '',
      })
      this.endGame(this.roomName, true, this.host.socket)
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
    this.titles = this.players.map(p => ({
      name: p.name,
      text: p.isCurrPlayer ? p.prompt : p.title.length > 0 ? p.title : 'dummy title'
    }))
    this.players.forEach(p => p.socket.emit('player-sync', { phase: this.phase, titles: this.titles }))
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