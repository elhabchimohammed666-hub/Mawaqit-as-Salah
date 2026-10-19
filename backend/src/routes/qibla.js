import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getQibla } from '../services/aladhan.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return res.status(400).json({ ok: false, message: 'Latitude et longitude requises.' });
    }

    const data = await getQibla({ latitude, longitude });
    res.json({ ok: true, data });
  }),
);

export default router;
