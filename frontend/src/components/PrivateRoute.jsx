import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Завантаження…</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
