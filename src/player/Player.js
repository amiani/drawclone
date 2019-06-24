module.exports = class Player {
  constructor(name, isLeader) {
    this.name = name
    this.isLeader = isLeader
    this.score = 0
    this.prompt = ''
    this.drawing = []
    this.guess = ''
    this.pick = ''
    this.isDrawingSubmitted = false
    this.isGuessSubmitted = false
    this.isPickSubmitted = false
  }
}