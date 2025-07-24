// backend/routes/user.js
import { Router } from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = Router();

/**
 * Рекурсивна функція для побудови дерева (до 10 рівнів для захисту від нескінченності)
 */
async function buildTree(userId, level = 0) {
  if (level > 10) return []; // захист від циклів
  const referrals = await User.find({ invitedBy: userId }, 'name email promo');
  const children = await Promise.all(
    referrals.map(async (ref) => ({
      _id: ref._id,
      name: ref.name,
      email: ref.email,
      promo: ref.promo,
      children: await buildTree(ref._id, level + 1)
    }))
  );
  return children;
}

// === ПІНГ ЮЗЕРА для online-статусу ===
router.post('/ping', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { lastActive: new Date() });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Запит свого дерева
router.get('/my-tree', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId, 'name email promo');
    if (!user) return res.status(404).json({ message: 'Не знайдено' });
    const tree = {
      _id: user._id,
      name: user.name,
      email: user.email,
      promo: user.promo,
      children: await buildTree(user._id)
    };
    res.json(tree);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Отримати всіх своїх рефералів (тільки перший рівень)
router.get('/my-referrals', auth, async (req, res) => {
  try {
    const referrals = await User.find({ invitedBy: req.userId }, 'name email promo');
    res.json(referrals);
  } catch (e) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// (Додатково) Дерево будь-якого користувача (тільки для адміна)
// router.get('/tree/:userId', auth, isAdmin, async (req, res) => { ... })

export default router;
