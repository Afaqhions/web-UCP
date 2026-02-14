// services/socketService.js
const socketService = {
  // Emit message to specific user
  emitToUser(io, userId, event, data) {
    io.to(`user-${userId}`).emit(event, data);
  },

  // Emit message to chat room
  emitToChat(io, chatId, event, data) {
    io.to(`chat-${chatId}`).emit(event, data);
  },

  // Broadcast to all connected users
  broadcastToAll(io, event, data) {
    io.emit(event, data);
  },

  // Join user to their room
  joinUserRoom(socket, userId) {
    socket.join(`user-${userId}`);
  },

  // Join chat room
  joinChatRoom(socket, chatId) {
    socket.join(`chat-${chatId}`);
  },

  // Leave user room
  leaveUserRoom(socket, userId) {
    socket.leave(`user-${userId}`);
  },

  // Leave chat room
  leaveChatRoom(socket, chatId) {
    socket.leave(`chat-${chatId}`);
  },

  // Get online users in a room
  getOnlineUsers(io, roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    return room ? room.size : 0;
  },
};

module.exports = socketService;
