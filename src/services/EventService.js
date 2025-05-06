import axios from 'axios';

const getApiClient = () =>
  axios.create({
    baseURL: import.meta.env.VITE_HOST_API,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: false,
  });

export default {
  getEvents: () => getApiClient().get('/events'),
};
