import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPrayersByCity, fetchPrayersByCoords, fetchQibla } from '../api/client';
import { getNextPrayer } from '../lib/prayer';

export function usePrayerTimes(settings) {
  const [payload, setPayload] = useState(null);
  const [qibla, setQibla] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const location = settings.location;
    if (!location) return;

    setLoading(true);
    setError('');

    try {
      const prayers =
        location.latitude != null && location.longitude != null
          ? await fetchPrayersByCoords({
              lat: location.latitude,
              lng: location.longitude,
              method: settings.method,
              school: settings.school,
            })
          : await fetchPrayersByCity({
              city: location.name,
              country: location.country,
              method: settings.method,
              school: settings.school,
            });

      setPayload(prayers);

      if (location.latitude != null && location.longitude != null) {
        const qiblaData = await fetchQibla({ lat: location.latitude, lng: location.longitude });
        setQibla(qiblaData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les horaires.');
    } finally {
      setLoading(false);
    }
  }, [settings]);

  useEffect(() => {
    load();
  }, [load]);

  const nextPrayer = useMemo(() => getNextPrayer(payload?.timings), [payload]);

  return { payload, qibla, nextPrayer, loading, error, reload: load };
}
