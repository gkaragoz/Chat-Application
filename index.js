var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server started at PORT: *3000');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    console.log('Someone is connected.');
    connections.push(socket);
    console.log('Total connections: ' + connections.length);

    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data});
    });

    socket.on('disconnect', function(data){
        console.log('Someone is disconnected.');
        connections.splice(connections.indexOf(socket), 1);
        console.log('Total connections: ' + connections.length);
    });
});