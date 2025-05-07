import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

export default apiClient;
