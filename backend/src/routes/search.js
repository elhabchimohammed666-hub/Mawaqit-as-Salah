import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { searchCities } from '../services/aladhan.js';

const router = Router();

router.get(
  '/city',
  asyncHandler(async (req, res) => {
    const query = req.query.q?.trim();

    if (!query || query.length < 2) {
      return res.status(400).json({ ok: false, message: 'Saisissez au moins 2 caractères.' });
    }

    const data = await searchCities(query);
    res.json({ ok: true, data });
  }),
);

export default router;
