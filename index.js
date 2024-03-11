const { log } = require('console');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`A user connected with ID ${socket.id}`);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = 3000 || process.env.PORT;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
