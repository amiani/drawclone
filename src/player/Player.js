module.exports = class Player {
  constructor(socket, name, isLeader, getPhase) {
    this.socket = socket
    this.getPhase = getPhase
    this.name = name
    this.isLeader = isLeader
    this.score = 0
    this.prompt = ''
    this.drawing = []
    this.title = ''
    this.pick = ''
    this.isCurrPlayer = false
    this.isDrawingSubmitted = false
    this.isTitleSubmitted = false
    this.isPickSubmitted = false
    console.log(`${name} joined`)
  }

  toJSON() {
    return {
      name: this.name,
      phase: this.getPhase(),
      isLeader: this.isLeader,
      score: this.score,
      prompt: this.prompt,
      drawing: this.drawing,
      title: this.title,
      pick: this.pick,
      isCurrPlayer: this.isCurrPlayer,
      isDrawingSubmitted: this.isDrawingSubmitted,
      isTitleSubmitted: this.isTitleSubmitted,
      isPickSubmitted: this.isPickSubmitted
    }
  }
}