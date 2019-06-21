module.exports = function(app) {
  console.log('running config')
  const http = require('http').createServer(app)
  const io = require('socket.io')(http)
  io.on('connection', function(socket) {
    console.log('hello')
  })
  http.listen(8081, function() {
    console.log('socket listening on localhost:8081')
  })
}