module.exports = class Host {
  constructor(socket) {
    this.socket = socket
    console.log('host connected')
  }

  toJSON() {
    return {
    }
  }
}