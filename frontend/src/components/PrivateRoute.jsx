// src/components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Завантаження…</div>;
  if (!user) return <Navigate to={redirectTo} replace />;

  // Можна використовувати як обгортку або як Outlet
  return children ? children : <Outlet />;
}
