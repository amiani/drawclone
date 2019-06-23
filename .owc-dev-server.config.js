const setupConnection = require('./src/setupConnection')

module.exports = function(app) {
  const http = require('http').createServer(app)
  const io = require('socket.io')(http)
  setupConnection(io)
  http.listen(8081, function() {
    console.log('socket listening on 8081');
  })
}