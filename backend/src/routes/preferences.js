import { Router } from 'express';
import { isDbReady } from '../config/db.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { Preference } from '../models/Preference.js';

const router = Router();

function requireDb(_req, res, next) {
  if (!isDbReady()) {
    return res.status(503).json({
      ok: false,
      message: 'MongoDB n’est pas configuré. Les préférences restent locales.',
    });
  }
  next();
}

router.use(requireDb);

router.get(
  '/:clientId',
  asyncHandler(async (req, res) => {
    const prefs = await Preference.findOne({ clientId: req.params.clientId }).lean();
    res.json({ ok: true, data: prefs });
  }),
);

router.put(
  '/:clientId',
  asyncHandler(async (req, res) => {
    const { method, school, theme, favoriteCities } = req.body || {};
    const prefs = await Preference.findOneAndUpdate(
      { clientId: req.params.clientId },
      {
        $set: {
          ...(method !== undefined && { method }),
          ...(school !== undefined && { school }),
          ...(theme !== undefined && { theme }),
          ...(favoriteCities !== undefined && { favoriteCities }),
        },
      },
      { new: true, upsert: true, runValidators: true },
    );
    res.json({ ok: true, data: prefs });
  }),
);

export default router;
