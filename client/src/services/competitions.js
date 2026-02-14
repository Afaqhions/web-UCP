import api from './api';

export const competitionService = {
  async getCompetitions(filters = {}, page = 1, pageSize = 12, sort = 'new') {
    const response = await api.get('/competitions', {
      params: { ...filters, page, pageSize, sort },
    });
    return response.data;
  },

  async getCompetitionById(id) {
    const response = await api.get(`/competitions/${id}`);
    return response.data;
  },

  async createCompetition(competitionData) {
    const response = await api.post('/competitions', competitionData);
    return response.data;
  },

  async updateCompetition(id, competitionData) {
    const response = await api.put(`/competitions/${id}`, competitionData);
    return response.data;
  },

  async deleteCompetition(id) {
    const response = await api.delete(`/competitions/${id}`);
    return response.data;
  },

  async getTrendingCompetitions() {
    const response = await api.get('/competitions/trending', {
      params: { limit: 6 },
    });
    return response.data;
  },

  async getCompetitionsByCategory(categoryId) {
    const response = await api.get('/competitions', {
      params: { category: categoryId },
    });
    return response.data;
  },

  async searchCompetitions(query) {
    const response = await api.get('/competitions/search', {
      params: { q: query },
    });
    return response.data;
  },
};
