import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect(token) {
    if (this.socket?.connected) return;

    // MOCK SOCKET FOR FRONTEND DEV ONLY
    console.log('Socket connection simulated (Backend unavailable)');
    this.socket = {
      connected: true,
      on: (event, callback) => {
        // console.log(`[MockSocket] Listening for: ${event}`);
      },
      emit: (event, data) => {
        // console.log(`[MockSocket] Emitting: ${event}`, data);
      },
      off: () => { },
      disconnect: () => { this.connected = false; }
    };
    this.connected = true;

    /* 
    // REAL IMPLEMENTATION DISABLED TO PREVENT 404s
    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.setupListeners();
    */
  }

  setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.connected = false;
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket && this.connected) {
      this.socket.emit(event, data);
    }
  }

  sendMessage(chatId, content, attachments = []) {
    this.emit('send-message', {
      chatId,
      content,
      attachments,
      timestamp: new Date(),
    });
  }

  joinChat(chatId) {
    this.emit('join-chat', { chatId });
  }

  leaveChat(chatId) {
    this.emit('leave-chat', { chatId });
  }

  sendTypingIndicator(chatId, isTyping) {
    this.emit('typing', { chatId, isTyping });
  }
}

export const socketService = new SocketService();
