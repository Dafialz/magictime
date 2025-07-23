// src/components/AdminRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  // --- Додаємо лог для дебагу ---
  console.log("AdminRoute user:", user, "loading:", loading);

  // Поки йде перевірка токена/профілю — не рендеримо нічого (або показати loader)
  if (loading) return <div style={{textAlign: "center", marginTop: "2rem"}}>Завантаження...</div>;

  // Якщо ще не залогінений — редирект на логін
  if (!user) return <Navigate to="/login" replace />;
  // Якщо не адмін — редирект на головну (або інше місце)
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // Якщо адмін — рендеримо вкладені маршрути
  return <Outlet />;
}
