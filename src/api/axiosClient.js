import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5001/api', // Adjust if deployed
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      // Support both structured tokens and flat access token
      const token = parsed.tokens?.accessToken || parsed.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore parse errors
    }
  }
  return config;
});

export default axiosClient;
