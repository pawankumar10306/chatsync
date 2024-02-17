const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e8
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`A user connected with ID ${socket.id}`);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });

  socket.on('file', (file) => {
    socket.broadcast.emit('file', file);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
