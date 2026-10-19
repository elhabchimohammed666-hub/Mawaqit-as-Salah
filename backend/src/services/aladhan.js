import axios from 'axios';
import { env } from '../config/env.js';

const aladhan = axios.create({
  baseURL: env.aladhanBaseUrl,
  timeout: 12000,
  headers: { Accept: 'application/json' },
});

const nominatim = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 12000,
  headers: {
    Accept: 'application/json',
    'User-Agent': 'MawaqitAsSalah/1.0 (local educational app)',
  },
});

function unwrap(response) {
  if (response.data?.code !== 200) {
    const message = response.data?.data || response.data?.status || 'Réponse AlAdhan invalide';
    const error = new Error(typeof message === 'string' ? message : 'Erreur AlAdhan');
    error.status = 502;
    throw error;
  }
  return response.data.data;
}

export async function getTimingsByCoordinates({ latitude, longitude, method, school, date }) {
  const path = date ? `/timings/${encodeURIComponent(date)}` : '/timings';
  const { data } = await aladhan.get(path, {
    params: {
      latitude,
      longitude,
      method,
      school,
    },
  });
  return unwrap({ data });
}

export async function getTimingsByCity({ city, country, method, school, date }) {
  const path = date ? `/timingsByCity/${encodeURIComponent(date)}` : '/timingsByCity';
  const { data } = await aladhan.get(path, {
    params: {
      city,
      country,
      method,
      school,
    },
  });
  return unwrap({ data });
}

export async function getQibla({ latitude, longitude }) {
  const { data } = await aladhan.get(`/qibla/${latitude}/${longitude}`);
  return unwrap({ data });
}

export async function getMethods() {
  const { data } = await aladhan.get('/methods');
  return unwrap({ data });
}

export async function searchCities(query) {
  const { data } = await nominatim.get('/search', {
    params: {
      q: query,
      format: 'json',
      addressdetails: 1,
      limit: 8,
    },
  });

  return (data || []).map((item) => ({
    id: String(item.place_id),
    name: item.address?.city || item.address?.town || item.address?.village || item.address?.municipality || item.name,
    country: item.address?.country || '',
    countryCode: item.address?.country_code?.toUpperCase() || '',
    displayName: item.display_name,
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  }));
}
