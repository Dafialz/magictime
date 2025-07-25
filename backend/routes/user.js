// backend/routes/user.js
import { Router } from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = Router();

/**
 * Рекурсивна функція для побудови дерева (до 10 рівнів для захисту від нескінченності)
 * Тепер шукає рефералів за username, а не за id
 */
async function buildTree(username, level = 0) {
  if (level > 10) return []; // захист від циклів
  const referrals = await User.find({ invitedBy: username }, 'name email promo username');
  const children = await Promise.all(
    referrals.map(async (ref) => ({
      _id: ref._id,
      name: ref.name,
      email: ref.email,
      promo: ref.promo,
      username: ref.username,
      children: await buildTree(ref.username, level + 1)
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

// Запит свого дерева з урахуванням логіну
router.get('/my-tree', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId, 'name email promo username');
    if (!user) return res.status(404).json({ message: 'Не знайдено' });
    const tree = {
      _id: user._id,
      name: user.name,
      email: user.email,
      promo: user.promo,
      username: user.username,
      children: await buildTree(user.username)
    };
    res.json(tree);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Отримати всіх своїх рефералів (тільки перший рівень) за логіном
router.get('/my-referrals', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId, 'username');
    if (!user) return res.status(404).json({ message: 'Не знайдено' });

    const referrals = await User.find({ invitedBy: user.username }, 'name email promo username');
    res.json(referrals);
  } catch (e) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// --- Маршрут для реферальної силки --- 
router.get('/ref/:referrerLogin', (req, res) => {
  const { referrerLogin } = req.params;
  // Зберігаємо referrerLogin в сесію (потрібно налаштувати сесії на сервері)
  req.session.referrerLogin = referrerLogin;

  // Якщо сесії немає, можна зберігати в куки, наприклад:
  // res.cookie('referrerLogin', referrerLogin, { maxAge: 24 * 60 * 60 * 1000 });

  // Перенаправлення на сторінку реєстрації
  res.redirect('/register');
});

export default router;
