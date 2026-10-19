import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDb() {
  if (!env.mongoUri) {
    console.log('[db] MONGO_URI absent — préférences persistées côté client uniquement.');
    return false;
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log('[db] MongoDB connecté.');
    return true;
  } catch (error) {
    console.error('[db] Connexion MongoDB impossible :', error.message);
    return false;
  }
}

export function isDbReady() {
  return mongoose.connection.readyState === 1;
}
