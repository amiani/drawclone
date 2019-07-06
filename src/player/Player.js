const colors = ['#31263e', '#ecebe4', '#80ff72', '#eec0c6', '#e63946', '#565554', '#97cc04', ]
let colorIndex = 0
module.exports = class Player {
  constructor(socket, name, isLeader, getPhase) {
    this.socket = socket
    this.getPhase = getPhase
    this.name = name
    this.color = colors[colorIndex++]
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