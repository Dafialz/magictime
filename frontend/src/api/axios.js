import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Відправляю запит:', config.method.toUpperCase(), config.baseURL + config.url);
    console.log('🔑 Токен:', token || 'Немає токена');
    return config;
  },
  (error) => {
    console.error('❌ Помилка при формуванні запиту:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Відповідь від сервера:', response);
    return response;
  },
  (error) => {
    console.error('🚨 Помилка відповіді:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
