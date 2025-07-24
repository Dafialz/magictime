import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://magictime.onrender.com/api',
  // Можна ще додати timeout, якщо треба:
  // timeout: 10000,
});

// Додаємо токен до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Для читабельності покажемо шлях:
    console.log(
      `🚀 [${new Date().toISOString()}] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      '| Token:',
      token ? token.slice(0, 12) + '...' : 'Немає'
    );
    return config;
  },
  (error) => {
    console.error('❌ Помилка при формуванні запиту:', error);
    return Promise.reject(error);
  }
);

// Логування всіх відповідей
api.interceptors.response.use(
  (response) => {
    console.log('✅ Відповідь:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // error.response? = є відповідь сервера, error.message = помилка мережі
    console.error(
      '🚨 Помилка відповіді:',
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
