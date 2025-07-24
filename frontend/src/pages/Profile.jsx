// src/pages/Profile.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';  // Контекст для отримання даних користувача
import api from "../api/axios"; // Додаємо імпорт API
import '../styles/profile.css';  // Підключаємо стилі для цього компонента

export default function Profile() {
  const { user, logout, loading } = useContext(AuthContext);  // Отримуємо інформацію про користувача з контексту

  // === Авто-пінг для онлайн-статусу ===
  useEffect(() => {
    if (!user) return; // не робити нічого, якщо не авторизований

    const ping = () => api.post("/user/ping").catch(() => {});
    ping(); // одразу при завантаженні
    const interval = setInterval(ping, 10000); // кожні 10 секунд

    return () => clearInterval(interval); // очищення при виході з профілю
  }, [user]);

  if (loading) return <div>Loading user...</div>;  // Показуємо повідомлення, поки дані користувача завантажуються
  if (!user) return <div>Not authorized. Go to login!</div>;  // Якщо користувач не авторизований, перенаправляємо на вхід

  return (
    <div className="profile-container">
      {/* Заголовок профілю */}
      <h1 className="profile-title">Вітаємо в Magic Time!</h1>

      {/* Основна картка профілю */}
      <div className="profile-card">
        {/* Заголовок картки профілю (аватар та основна інформація) */}
        <div className="profile-header">
          <img 
            src={user.avatarUrl || 'default-avatar.jpg'} 
            alt="User Avatar" 
            className="profile-img" 
          />
          <div className="profile-info">
            <h2>{user.name || 'Невідоме ім’я'}</h2>
            <p>Email: {user.email || 'Невідомий email'}</p>
            <p>Пакет: {user.package || 'Невідомий пакет'}</p>
            <p>Країна: {user.country || 'Невідома країна'}</p>
            <p>Level: {user.level || 'Не визначено'}</p>
          </div>
        </div>

        {/* Інформація про пакет та заробіток */}
        <div className="profile-details">
          <div className="profile-package">
            <h3>Мій пакет</h3>
            <p>Назва: {user.packageName || 'Не визначено'}</p>
            <p>Днів залишилось: {user.daysRemaining || 'N/A'}</p>
          </div>

          <div className="profile-earnings">
            <h3>Мій заробіток</h3>
            <p>Долари: ${user.earnings || '0.00'}</p>
            <p>Токени: {user.tokens || '0'}</p>
          </div>
        </div>

        {/* Кнопка для виходу */}
        <button className="btn-update" onClick={logout}>Вийти</button>
      </div>
    </div>
  );
}
