// backend/middleware/updateLastActive.js
import User from '../models/User.js';

export default async function updateLastActive(req, res, next) {
  if (req.userId) {
    try {
      await User.findByIdAndUpdate(req.userId, { lastActive: new Date() });
    } catch (e) {
      // Не зупиняємо користувача через помилку з оновленням lastActive
      console.error('Помилка оновлення lastActive:', e);
    }
  }
  next();
}
