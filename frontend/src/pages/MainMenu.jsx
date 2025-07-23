// src/pages/MainMenu.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MainMenu() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold mb-6">
        Ласкаво просимо, {user.name || user.email}!
      </h1>

      {/* Головне меню */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          to="/dashboard/profile"
          className="block p-6 bg-white rounded shadow hover:shadow-lg transition"
        >
          Профіль
        </Link>
        <Link
          to="/dashboard/events"
          className="block p-6 bg-white rounded shadow hover:shadow-lg transition"
        >
          Мої події
        </Link>
        <Link
          to="/dashboard/settings"
          className="block p-6 bg-white rounded shadow hover:shadow-lg transition"
        >
          Налаштування
        </Link>
        <button
          onClick={logout}
          className="block p-6 bg-red-100 text-red-700 rounded shadow hover:shadow-lg transition"
        >
          Вийти
        </button>
      </div>

      {/* Заглушка для майбутнього контенту */}
      <div className="p-6 bg-white border-dashed border-2 border-gray-300 rounded text-center">
        <h2 className="text-2xl mb-4">Тут скоро з’явиться ваш контент 🚀</h2>
        <p className="text-gray-600">Працюємо над новими розділами, слідкуйте за оновленнями!</p>
      </div>
    </div>
  );
}
