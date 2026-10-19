import mongoose from 'mongoose';

const favoriteCitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, default: '' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false },
);

const preferenceSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, unique: true, index: true },
    method: { type: Number, default: 3 },
    school: { type: Number, default: 0 },
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    favoriteCities: { type: [favoriteCitySchema], default: [] },
  },
  { timestamps: true },
);

export const Preference = mongoose.model('Preference', preferenceSchema);
