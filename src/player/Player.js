module.exports = class Player {
  constructor(socket, name, isLeader) {
    this.socket = socket
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
    console.log(`${name} joined`)
  }

  toJSON() {
    return {
      name: this.name,
      isLeader: this.isLeader,
      score: this.score,
      prompt: this.prompt,
      drawing: this.drawing,
      guess: this.guess,
      pick: this.pick,
      isDrawingSubmitted: this.isDrawingSubmitted,
      isGuessSubmitted: this.isGuessSubmitted,
      isPickSubmitted: this.isPickSubmitted
    }
  }
}