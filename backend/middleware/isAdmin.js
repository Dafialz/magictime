// backend/middleware/isAdmin.js

export default function isAdmin(req, res, next) {
  if (req.role === 'admin') {
    return next(); // все добре, це адмін
  }
  return res.status(403).json({ message: 'Доступ тільки для адміністратора' });
}
