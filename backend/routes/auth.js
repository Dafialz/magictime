// backend/routes/auth.js
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name', 'Введіть імʼя').trim().notEmpty(),
    body('email', 'Некоректний email').isEmail(),
    body('password', 'Мінімум 6 символів').isLength({ min: 6 }),
    body('promo').optional().trim()  // необов’язкове поле реферального коду
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password, promo } = req.body;

    try {
      // Перевірка наявності email
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Такий email вже зайнятий' });
      }

      // Знайти реферера за промокодом (якщо він переданий)
      let invitedBy = null;

      // В першу чергу пробуємо взяти referrerLogin із сесії
      if (req.session && req.session.referrerLogin) {
        const inviterBySession = await User.findOne({ username: req.session.referrerLogin });
        if (inviterBySession) {
          invitedBy = inviterBySession.username;
        }
      } else if (promo) {
        // promo = промокод, пошук за ним
        const inviterByPromo = await User.findOne({ promo: promo });
        if (!inviterByPromo) {
          return res.status(400).json({ message: 'Некоректний промокод' });
        }
        invitedBy = inviterByPromo.username;
      }

      // Хешуємо пароль
      const hash = await bcrypt.hash(password, 12);

      // Створюємо нового користувача, зберігаючи поле invitedBy і свій promo = name
      const user = new User({
        username: name,   // Якщо в тебе username - це name, інакше зміни
        email,
        passwordHash: hash,
        invitedBy,        // тут логін того, хто запросив
        promo: name       // робимо власний промокод рівним ніку
      });
      await user.save();

      // Створюємо JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Віддаємо токен і мінімальну інформацію про користувача
      res.status(201).json({
        token,
        user: {
          id:    user._id,
          name:  user.username,
          email: user.email,
          role:  user.role
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Щось пішло не так, спробуйте пізніше' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Некоректний email').isEmail(),
    body('password', 'Введіть пароль').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Користувача не знайдено' });
      }
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Невірний пароль' });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        user: {
          id:    user._id,
          name:  user.username,
          email: user.email,
          role:  user.role
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Щось пішло не так, спробуйте пізніше' });
    }
  }
);

// GET /api/auth/me — повертає профіль поточного користувача
router.get(
  '/me',
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-passwordHash');
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено' });
      }
      res.json({
        id:    user._id,
        name:  user.username,
        email: user.email,
        role:  user.role
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Помилка сервера' });
    }
  }
);

export default router;
