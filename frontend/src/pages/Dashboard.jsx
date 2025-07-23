import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Заголовок */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Мій Кабінет</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
          >
            Вийти
          </button>
        </header>

        {/* Блок: Інформація про користувача */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">👤 Профіль</h2>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </section>

        {/* Блок: Мій Пакет */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">💼 Мій пакет</h2>
          <p><strong>Назва:</strong> Basic</p>
          <p><strong>Днів залишилось:</strong> 14</p>
          <p><strong>Бонус токенів:</strong> 5 NAGT</p>
        </section>

        {/* Блок: Доходи */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">💸 Мій заробіток</h2>
          <p><strong>Долари:</strong> $23.40</p>
          <p><strong>Токени:</strong> 10.4 NAGT</p>
        </section>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-4">
          <Link to="/packages" className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Тарифи / Оновлення
          </Link>
          <Link to="/tree" className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700">
            Моя структура
          </Link>
        </div>

      </div>
    </div>
  );
}
