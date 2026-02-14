import api from './api';

export const registrationService = {
  async registerForCompetition(competitionId, registrationData) {
    const response = await api.post(`/registrations`, {
      competitionId,
      ...registrationData,
    });
    return response.data;
  },

  async getMyRegistrations(page = 1, pageSize = 10) {
    const response = await api.get('/registrations/my', {
      params: { page, pageSize },
    });
    return response.data;
  },

  async getRegistration(id) {
    const response = await api.get(`/registrations/${id}`);
    return response.data;
  },

  async updateRegistration(id, data) {
    const response = await api.put(`/registrations/${id}`, data);
    return response.data;
  },

  async cancelRegistration(id) {
    const response = await api.post(`/registrations/${id}/cancel`);
    return response.data;
  },

  async getAllRegistrations(filters = {}, page = 1, pageSize = 10) {
    const response = await api.get('/registrations', {
      params: { ...filters, page, pageSize },
    });
    return response.data;
  },

  async getPendingRegistrations() {
    const response = await api.get('/registrations/pending');
    return response.data;
  },

  async approveRegistration(id) {
    const response = await api.post(`/registrations/${id}/approve`);
    return response.data;
  },

  async rejectRegistration(id, reason) {
    const response = await api.post(`/registrations/${id}/reject`, { reason });
    return response.data;
  },
};
