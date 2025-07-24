import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const active   = 'text-blue-600';
  const inactive = 'text-gray-700 hover:text-blue-400';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      {/* Ліва частина — Логотип + Назва */}
      <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
        <img
          src="/images/logo.png"
          alt="Логотип"
          className="w-24 h-24 object-contain mr-2"
          style={{ background: "#fff", borderRadius: "12px" }}
        />
      </Link>

      {/* Меню */}
      <ul className="flex space-x-6 items-center">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? active : inactive}
          >
            Home
          </NavLink>
        </li>
        {/* --- Додаємо Тарифи --- */}
        <li>
          <NavLink
            to="/tariffs"
            className={({ isActive }) => isActive ? active + " font-bold" : inactive}
          >
            Тарифи
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? active : inactive}
              >
                Кабінет
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/network"
                className={({ isActive }) => isActive ? active : inactive}
              >
                Network
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => isActive ? active : inactive}
              >
                Профіль
              </NavLink>
            </li>
            {/* Кнопка Support — різні маршрути для user/admin */}
            <li>
              <NavLink
                to={user.role === 'admin' ? '/admin/support' : '/support'}
                className={({ isActive }) => isActive ? active : inactive}
              >
                Support
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Вийти
              </button>
            </li>
          </>
        )}

        {!user && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => isActive ? active : inactive}
              >
                Реєстрація
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => isActive ? active : inactive}
              >
                Вхід
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
