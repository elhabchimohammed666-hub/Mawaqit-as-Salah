import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import methodsRouter from './routes/methods.js';
import prayerRouter from './routes/prayer.js';
import preferencesRouter from './routes/preferences.js';
import qiblaRouter from './routes/qibla.js';
import searchRouter from './routes/search.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientOrigin.split(',').map((origin) => origin.trim()),
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 80,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'mawaqit-backend',
    time: new Date().toISOString(),
  });
});

app.use('/api/prayers', prayerRouter);
app.use('/api/qibla', qiblaRouter);
app.use('/api/methods', methodsRouter);
app.use('/api/search', searchRouter);
app.use('/api/preferences', preferencesRouter);

app.use(notFound);
app.use(errorHandler);

await connectDb();

app.listen(env.port, () => {
  console.log(`[server] Mawaqit API prête sur http://localhost:${env.port}`);
});
