export const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const PRAYER_META = {
  Imsak: { label: 'Imsak', arabic: 'الإمساك' },
  Fajr: { label: 'Fajr', arabic: 'الفجر' },
  Sunrise: { label: 'Chourouq', arabic: 'الشروق' },
  Dhuhr: { label: 'Dohr', arabic: 'الظهر' },
  Asr: { label: 'Asr', arabic: 'العصر' },
  Maghrib: { label: 'Maghrib', arabic: 'المغرب' },
  Isha: { label: 'Icha', arabic: 'العشاء' },
};

export const DEFAULT_METHODS = [
  { id: 3, name: 'Muslim World League' },
  { id: 2, name: 'ISNA' },
  { id: 5, name: 'Egyptian General Authority' },
  { id: 4, name: 'Umm Al-Qura, Makkah' },
  { id: 12, name: 'UOIF (France)' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 13, name: 'Diyanet (Turquie)' },
  { id: 9, name: 'Koweït' },
];

export function parseTimeToDate(hhmm) {
  const [hours, minutes] = String(hhmm).slice(0, 5).split(':').map(Number);
  const now = new Date();
  const date = new Date(now);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function getNextPrayer(timings) {
  if (!timings) return null;
  const now = new Date();

  for (const name of PRAYER_ORDER) {
    const at = parseTimeToDate(timings[name]);
    if (at > now) {
      return { name, at };
    }
  }

  const tomorrowFajr = parseTimeToDate(timings.Fajr);
  tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
  return { name: 'Fajr', at: tomorrowFajr };
}

export function formatRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(total / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return { hours, minutes, seconds };
}

export function methodListFromApi(payload) {
  if (!payload || typeof payload !== 'object') return DEFAULT_METHODS;
  return Object.values(payload)
    .filter((item) => item && typeof item.id === 'number')
    .map((item) => ({ id: item.id, name: item.name }))
    .sort((a, b) => a.id - b.id);
}
