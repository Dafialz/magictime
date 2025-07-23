import { Router } from 'express';
const router = Router();

// пример маршрута оплаты
router.post('/', async (req, res) => {
  // здесь ваша логика платежа
  res.json({ status: 'ok' });
});

export default router;
