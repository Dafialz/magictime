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
import adminRoutes from './routes/admin.js';
import supportRoutes from './routes/support.js';
import userRoutes from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// ====== CORS: додано Netlify, Render та Vercel ======
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5184',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
  'http://127.0.0.1:5184',
  'https://magictime.netlify.app',       // продакшн фронт Netlify
  'https://magictime-xi.vercel.app',     // !!! додано твій фронт на Vercel
  'https://magictime.onrender.com',      // бекенд Render (якщо треба тестувати з нього)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed from this origin: ' + origin), false);
  },
  credentials: true,
}));

// JSON body parser
app.use(express.json());

// Статичні файли фронту (vite build → dist)
app.use(
  express.static(
    path.resolve(__dirname, '../frontend/dist')
  )
);

// API маршрути
app.use('/api/auth',    authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin',   adminRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/user',    userRoutes);

// Демонстраційний ендпоінт
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

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../frontend/dist/index.html')
  );
});

// MongoDB connect + запуск сервера
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
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
