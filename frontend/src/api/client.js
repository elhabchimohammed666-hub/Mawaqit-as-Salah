import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

export async function fetchPrayersByCoords({ lat, lng, method, school }) {
  const { data } = await api.get('/prayers/by-coords', {
    params: { lat, lng, method, school },
  });
  return data.data;
}

export async function fetchPrayersByCity({ city, country, method, school }) {
  const { data } = await api.get('/prayers/by-city', {
    params: { city, country, method, school },
  });
  return data.data;
}

export async function fetchQibla({ lat, lng }) {
  const { data } = await api.get('/qibla', { params: { lat, lng } });
  return data.data;
}

export async function fetchMethods() {
  const { data } = await api.get('/methods');
  return data.data;
}

export async function searchCities(q) {
  const { data } = await api.get('/search/city', { params: { q } });
  return data.data;
}
