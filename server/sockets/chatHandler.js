// sockets/chatHandler.js
const Chat = require('../models/Chat');
const socketService = require('../services/socketService');

const chatHandler = (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join user's personal room
  socket.on('join', (userId) => {
    socketService.joinUserRoom(socket, userId);
    console.log(`User ${userId} joined their room`);
  });

  // Join chat room
  socket.on('join-chat', (chatId) => {
    socketService.joinChatRoom(socket, chatId);
    io.to(`chat-${chatId}`).emit('user-joined', { userId: socket.id });
  });

  // Send message
  socket.on('send-message', async (data) => {
    try {
      const { chatId, userId, content, attachments } = data;

      // Save to database
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: {
              sender: userId,
              content,
              attachments: attachments || [],
              timestamp: new Date(),
              read: false,
              delivered: true,
            },
          },
          lastMessageAt: new Date(),
        },
        { new: true }
      );

      if (chat) {
        // Emit to all users in the chat
        io.to(`chat-${chatId}`).emit('message-received', {
          chatId,
          message: chat.messages[chat.messages.length - 1],
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Typing indicator
  socket.on('typing', ({ chatId, isTyping, userName }) => {
    socket.to(`chat-${chatId}`).emit('user-typing', { isTyping, userName });
  });

  // Mark message as read
  socket.on('mark-read', async (data) => {
    try {
      const { chatId, messageId } = data;

      const chat = await Chat.findById(chatId);
      if (chat) {
        const message = chat.messages.find((m) => m._id.toString() === messageId);
        if (message) {
          message.read = true;
          await chat.save();
          io.to(`chat-${chatId}`).emit('message-read', { messageId });
        }
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  });

  // Leave chat room
  socket.on('leave-chat', (chatId) => {
    socketService.leaveChatRoom(socket, chatId);
    io.to(`chat-${chatId}`).emit('user-left', { userId: socket.id });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};

module.exports = chatHandler;
