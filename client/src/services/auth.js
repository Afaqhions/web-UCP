import api from './api';

export const authService = {
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  async deactivateAccount() {
    const response = await api.post('/auth/deactivate');
    return response.data;
  },

  async syncClerkUser(clerkData) {
    console.log('🚀 Client: syncClerkUser called with ID:', clerkData?.id);
    const response = await api.post('/auth/sync-clerk-user', { data: clerkData });
    return response.data;
  }
};
