// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Нет токена, доступ запрещён' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Неверный токен' });
  }

  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Додаємо userId і role для наступних middleware
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Токен невалиден' });
  }
}
