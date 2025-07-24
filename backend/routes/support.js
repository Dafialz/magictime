import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import SupportChat from '../models/SupportChat.js';
import updateLastActive from '../middleware/updateLastActive.js'; // Підключаємо middleware

const router = express.Router();

// User: отримати свою історію
router.get('/my', auth, updateLastActive, async (req, res) => {
  try {
    const messages = await SupportChat.find({ userId: req.userId }).sort('createdAt');
    res.json(messages);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при отриманні історії' });
  }
});

// User: надіслати повідомлення
router.post('/', auth, updateLastActive, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Порожнє повідомлення' });
    const msg = await SupportChat.create({
      sender: 'user',
      userId: req.userId,
      message
    });
    res.status(201).json(msg);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при надсиланні' });
  }
});

// --- ADMIN ---

// Список чатів (унікальні користувачі) + lastActive
router.get('/chats', auth, isAdmin, async (req, res) => {
  try {
    const users = await SupportChat.aggregate([
      { $group: { _id: "$userId" } },
      {
        $lookup: {
          from: "users",
          let: { userObjId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } },
            { $project: { name: 1, email: 1, lastActive: 1 } }
          ],
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          name: "$user.name",
          email: "$user.email",
          lastActive: "$user.lastActive"
        }
      }
    ]);
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при отриманні чатів' });
  }
});

// Історія чату з конкретним користувачем
router.get('/:userId', auth, isAdmin, async (req, res) => {
  try {
    const messages = await SupportChat.find({ userId: req.params.userId }).sort('createdAt');
    res.json(messages);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при отриманні чату юзера' });
  }
});

// Відповісти юзеру (вибраний чат)
router.post('/:userId', auth, isAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Порожнє повідомлення' });
    const msg = await SupportChat.create({
      sender: 'admin',
      userId: req.params.userId,
      message
    });

    // ОНОВЛЮЄМО lastActive користувача при відповіді адміна
    // (Залишаємо тільки тут, якщо потрібно)
    // Якщо треба й для адміна — можна зробити окремий middleware

    await import('../models/User.js').then(({ default: User }) => {
      User.findByIdAndUpdate(req.params.userId, { lastActive: new Date() }).catch(e => {});
    });

    res.status(201).json(msg);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при відповіді' });
  }
});

export default router;
