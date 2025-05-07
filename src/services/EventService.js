import apiClient from './apiClient';

export default {
  getEvents: () => apiClient.get('/events'),
  getEventById: (eventId) => apiClient.get(`/events/${eventId}`),
};
