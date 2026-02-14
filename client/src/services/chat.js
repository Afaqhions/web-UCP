import api from './api';

export const chatService = {
  async getChats(page = 1, pageSize = 10) {
    const response = await api.get('/chats', { params: { page, pageSize } });
    return response.data;
  },

  async getChatMessages(chatId, page = 1, pageSize = 20) {
    const response = await api.get(`/chats/${chatId}/messages`, {
      params: { page, pageSize },
    });
    return response.data;
  },

  async sendMessage(chatId, content, attachments = []) {
    const response = await api.post(`/chats/${chatId}/messages`, {
      content,
      attachments,
    });
    return response.data;
  },

  async markAsRead(chatId) {
    const response = await api.post(`/chats/${chatId}/mark-read`);
    return response.data;
  },

  async deleteChat(chatId) {
    const response = await api.delete(`/chats/${chatId}`);
    return response.data;
  },

  async sendAIMessage(content) {
    const response = await api.post('/chats/ai/message', { content });
    return response.data;
  },

  async getAIConversation(conversationId) {
    const response = await api.get(`/chats/ai/${conversationId}`);
    return response.data;
  },
};
