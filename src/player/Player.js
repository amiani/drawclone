module.exports = class Player {
  constructor(socket, name, color, isLeader, getPhase) {
    this.socket = socket
    this.getPhase = getPhase
    this.name = name
    this.color = color
    this.isLeader = isLeader
    this.score = 0
    this.prompt = ''
    this.drawing = []
    this.title = ''
    this.pick = ''
    this.pickers = []
    this.isCurrPlayer = false
    this.isDrawingSubmitted = false
    this.isTitleSubmitted = false
    this.isPickSubmitted = false
    console.log(`${name} joined`)
  }

  toJSON() {
    return {
      name: this.name,
      color: this.color,
      phase: this.getPhase(),
      isLeader: this.isLeader,
      score: this.score,
      prompt: this.prompt,
      drawing: this.drawing,
      title: this.title,
      pick: this.pick,
      pickers: this.pickers,
      isCurrPlayer: this.isCurrPlayer,
      isDrawingSubmitted: this.isDrawingSubmitted,
      isTitleSubmitted: this.isTitleSubmitted,
      isPickSubmitted: this.isPickSubmitted
    }
  }
}