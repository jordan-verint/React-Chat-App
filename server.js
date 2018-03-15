var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('SEND_USERNAME', function(data){
    io.emit('LOG_USERNAME', data);
  });
  
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('RECEIVE_MESSAGE', data);
  });
  
  socket.on('disconnect', function(data){
    console.log('user disconnected');
    io.emit('USER_LEFT', data);
  });
});

http.listen(8000, function() {
	console.log('listening on *:8000');
});  

