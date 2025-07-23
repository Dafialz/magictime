// src/pages/Register.jsx
import React, { useState, useContext, useEffect } from 'react';
import api from '../api/axios.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Додаємо поле promo до форми
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    promo: ''      // тут зберігаємо промокод запрошувача
  });
  const [error, setError] = useState('');

  // Автозаповнення promo з query-рядка (?ref=nickname)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setForm(prev => ({ ...prev, promo: ref }));
    }
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // Регістрація з промокодом
      await api.post('/auth/register', form);

      // Одразу логін після успішної реєстрації
      const { data } = await api.post('/auth/login', {
        email: form.email,
        password: form.password
      });

      login(data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка реєстрації');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-center">Реєстрація</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Нікнейм"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* Поле промокоду */}
        <input
          name="promo"
          value={form.promo}
          onChange={handleChange}
          placeholder="Промокод (нік запрошувача)"
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
}
