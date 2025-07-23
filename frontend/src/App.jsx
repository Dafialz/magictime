import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Navbar           from './components/Navbar';
import Landing          from './pages/Landing';
import Profile          from './pages/Profile';
import Dashboard        from './pages/Dashboard';
import PrivateRoute     from './components/PrivateRoute';
import Register         from './pages/Register';
import Login            from './pages/Login';
import Network          from './pages/Network';
import AdminPackages    from './pages/AdminPackages';
import AdminRoute       from './components/AdminRoute';
import SupportChatPage  from './pages/SupportChatPage';
import AdminSupportPage from './pages/AdminSupportPage'; // <--- ДОДАНО!

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Головна відкрита сторінка */}
          <Route path="/" element={<Landing />} />

          {/* Відкриті маршрути */}
          <Route path="/register" element={<Register />} />
          <Route path="/login"    element={<Login />}    />
          <Route path="/support"  element={<SupportChatPage />} />

          {/* Приватні маршрути */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile"   element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/network"   element={<Network />} />
          </Route>

          {/* --- Адмінські маршрути --- */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/packages" element={<AdminPackages />} />
            <Route path="/admin/support"  element={<AdminSupportPage />} /> {/* <- ДОДАНО */}
            {/* Можеш додавати ще адмін-сторінки тут */}
          </Route>
          {/* --- / --- */}

          {/* Все інше — редірект на головну */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
