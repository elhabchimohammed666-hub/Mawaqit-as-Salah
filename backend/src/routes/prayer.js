import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getTimingsByCity, getTimingsByCoordinates } from '../services/aladhan.js';

const router = Router();

function parseCalculationParams(query) {
  const method = query.method === undefined ? 3 : Number(query.method);
  const school = query.school === undefined ? 0 : Number(query.school);
  const date = query.date || undefined;

  if (Number.isNaN(method) || Number.isNaN(school)) {
    const error = new Error('Les paramètres method et school doivent être numériques.');
    error.status = 400;
    throw error;
  }

  return { method, school, date };
}

router.get(
  '/by-coords',
  asyncHandler(async (req, res) => {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return res.status(400).json({ ok: false, message: 'Latitude et longitude requises.' });
    }

    const data = await getTimingsByCoordinates({
      latitude,
      longitude,
      ...parseCalculationParams(req.query),
    });

    res.json({ ok: true, data });
  }),
);

router.get(
  '/by-city',
  asyncHandler(async (req, res) => {
    const city = req.query.city?.trim();
    const country = req.query.country?.trim();

    if (!city) {
      return res.status(400).json({ ok: false, message: 'Le nom de la ville est requis.' });
    }

    const data = await getTimingsByCity({
      city,
      country,
      ...parseCalculationParams(req.query),
    });

    res.json({ ok: true, data });
  }),
);

export default router;
