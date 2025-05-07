import apiClient from './apiClient';

export default {
  getEvents: () => apiClient.get('/events'),
};
