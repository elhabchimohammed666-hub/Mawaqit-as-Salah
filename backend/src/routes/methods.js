import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { getMethods } from '../services/aladhan.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const data = await getMethods();
    res.json({ ok: true, data });
  }),
);

export default router;
