import api from './api';

export const adminService = {
  // Users
  async getAllUsers(page = 1, pageSize = 10) {
    const response = await api.get('/admin/users', { params: { page, pageSize } });
    return response.data;
  },

  async getUserDetails(userId) {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  async deleteUser(userId) {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  async banUser(userId) {
    const response = await api.post(`/admin/users/${userId}/ban`);
    return response.data;
  },

  // Competitions
  async getAllCompetitions(page = 1, pageSize = 10) {
    const response = await api.get('/admin/competitions', { params: { page, pageSize } });
    return response.data;
  },

  async approveCompetition(competitionId) {
    const response = await api.post(`/admin/competitions/${competitionId}/approve`);
    return response.data;
  },

  async rejectCompetition(competitionId, reason) {
    const response = await api.post(`/admin/competitions/${competitionId}/reject`, { reason });
    return response.data;
  },

  // Categories
  async getCategories() {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  async updateCategory(categoryId, categoryData) {
    const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
    return response.data;
  },

  async deleteCategory(categoryId) {
    const response = await api.delete(`/admin/categories/${categoryId}`);
    return response.data;
  },

  // Analytics
  async getAnalytics(period = 'month') {
    const response = await api.get('/admin/analytics', { params: { period } });
    return response.data;
  },

  // Registrations
  async getAllRegistrations(page = 1, pageSize = 10) {
    const response = await api.get('/admin/registrations', { params: { page, pageSize } });
    return response.data;
  },

  async getPendingRegistrations() {
    const response = await api.get('/admin/registrations/pending');
    return response.data;
  },
};
