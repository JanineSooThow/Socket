const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);  //passing http server instance into socket io

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    //emit a connection message back to the client with the message 'a user connected'
    io.emit('connection', 'a user connected');  
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
//server will listen for chat message or notification and then console log it
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message:', msg.content + ', username: '  + msg.username);
      });
  });
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});