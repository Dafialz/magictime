import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';       // Адмінські маршрути
import supportRoutes from './routes/support.js';   // Підтримка (чат)
import userRoutes from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// ===== Налаштування CORS =====
// Дозволяємо доступ з фронтенд адрес
app.use(cors({
  origin: [
    'http://localhost:5174',
    'http://localhost:5184',
  ],
  credentials: true,
}));

// 1) JSON‑парсер для роботи з JSON в тілі запитів
// 2) Сервінг статичних файлів фронтенду (збудованого)
app.use(express.json());
app.use(
  express.static(
    path.resolve(__dirname, '../frontend/dist')
  )
);

// 3) Підключення API‑маршрутів
app.use('/api/auth',    authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin',   adminRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/user',    userRoutes);

// 4) Демонстраційний тестовий ендпоінт — можна видалити
app.get('/api/myteam', (req, res) => {
  res.json({
    id: "123456",
    name: "Roman Ivanov",
    status: "Silver Partner",
    avatar: "https://ui-avatars.com/api/?name=Roman+Ivanov",
    referralLink: "https://magictime.com/ref/123456",
    team: [
      {
        id: "234567",
        name: "User 1",
        investment: 700,
        color: "#53A9FA",
      },
      {
        id: "345678",
        name: "User 2",
        color: "#8E8FFA",
        children: [
          {
            id: "456780",
            name: "User 4",
            status: "Inactive",
            joinDate: "01 Apr, 2024",
            color: "#F7A334",
          },
          {
            id: "678901",
            name: "User 5",
            color: "#53A9FA",
          }
        ]
      },
      {
        id: "456789",
        name: "User 3",
        color: "#36CFCB",
      }
    ]
  });
});

// 5) SPA fallback — усі запити, які не співпадають з API,
//     повертають фронтенд додаток (index.html)
app.get('*', (_req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../frontend/dist/index.html')
  );
});

// 6) Підключення до MongoDB та запуск серверу
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
    // Обробка помилки порту, якщо він зайнятий
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} already in use. Please free the port or use a different one.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
      }
    });
  })
  .catch((err) => console.error('❌ DB connection error:', err));
