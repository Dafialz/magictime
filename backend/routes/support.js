import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import SupportChat from '../models/SupportChat.js';

const router = express.Router();

// User: отримати свою історію
router.get('/my', auth, async (req, res) => {
  try {
    const messages = await SupportChat.find({ userId: req.userId }).sort('createdAt');
    res.json(messages);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при отриманні історії' });
  }
});

// User: надіслати повідомлення
router.post('/', auth, async (req, res) => {
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

// Список чатів (унікальні користувачі)
router.get('/chats', auth, isAdmin, async (req, res) => {
  try {
    const users = await SupportChat.aggregate([
      { $group: { _id: "$userId" } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { _id: 1, name: "$user.name", email: "$user.email" } }
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
    res.status(201).json(msg);
  } catch (e) {
    res.status(500).json({ message: 'Помилка при відповіді' });
  }
});

export default router;
