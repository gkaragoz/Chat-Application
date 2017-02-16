var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientCount = 0;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  clientCount++;
  console.log('total online users: ' + clientCount);

  io.emit('request onlines', clientCount); 
  
  socket.on('nickname', function (nickname){
    console.log('nickname: ', nickname);
  });

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    clientCount--;
    console.log('total online users: ' + clientCount);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});