const store = require('./store')

module.exports = function(app) {
  const http = require('http').createServer(app)
  const io = require('socket.io')(http)

  io.on('connection', function(socket) {
    console.log('player client connected')
    socket.on('player-join', (data, cb) => {
      if (data) {
        console.log('player joined')
        store[data] = { name: data }
        cb(true)
      }
    })
  })

  http.listen(8081, function() {
    console.log('socket listening on 8081')
  })
}