// config/socket.js
const socketService = require('../services/socketService');
const chatHandler = require('../sockets/chatHandler');

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    chatHandler(io, socket);
  });

  return io;
};

module.exports = initializeSocket;
