// backend/routes/admin.js 

import express from 'express';
import authMiddleware from '../middleware/auth.js'; // middleware, який перевіряє токен
import isAdmin from '../middleware/isAdmin.js';     // middleware, який перевіряє роль "admin"
import User from '../models/User.js';               // Модель User
import Package from '../models/Package.js';         // Модель Package (тарифи)

const router = express.Router();

// --- Роут: список всіх користувачів (тільки для адміна)
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- CRUD для тарифів (Packages) --- //

// Отримати всі тарифи
router.get('/packages', authMiddleware, isAdmin, async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося отримати тарифи' });
  }
});

// Створити новий тариф
router.post('/packages', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, price, duration, tokens, description } = req.body;
    const pkg = await Package.create({ name, price, duration, tokens, description });
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити тариф' });
  }
});

// Оновити тариф
router.put('/packages/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findByIdAndUpdate(id, req.body, { new: true });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити тариф' });
  }
});

// Видалити тариф
router.delete('/packages/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Package.findByIdAndDelete(id);
    res.json({ message: 'Тариф видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити тариф' });
  }
});

export default router;
