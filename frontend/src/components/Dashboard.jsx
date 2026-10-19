import { useEffect, useState } from 'react';
import { fetchMethods } from '../api/client';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useSettings } from '../hooks/useSettings';
import { useTheme } from '../hooks/useTheme';
import { methodListFromApi, PRAYER_ORDER } from '../lib/prayer';
import Countdown from './Countdown';
import DateHeader from './DateHeader';
import LocationSelector from './LocationSelector';
import Navbar from './Navbar';
import PrayerCard from './PrayerCard';
import QiblaCompass from './QiblaCompass';
import SettingsPanel from './SettingsPanel';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const { settings, setSettings } = useSettings();
  const { payload, qibla, nextPrayer, loading, error } = usePrayerTimes(settings);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    fetchMethods()
      .then((data) => setMethods(methodListFromApi(data)))
      .catch(() => setMethods([]));
  }, []);

  useEffect(() => {
    if (!settings.location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSettings((prev) => {
          if (prev.location) return prev;
          return {
            ...prev,
            location: {
              name: 'Ma position',
              country: '',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
        });
      });
    }
  }, [settings.location, setSettings]);

  const geolocate = () => {
    if (!navigator.geolocation) {
      window.alert('La géolocalisation n’est pas disponible sur ce navigateur.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSettings((prev) => ({
          ...prev,
          location: {
            name: 'Ma position',
            country: '',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      },
      () => window.alert('Autorisez la localisation pour obtenir les horaires automatiques.'),
    );
  };

  const timings = payload?.timings;
  const extra = ['Imsak', 'Sunrise'];

  return (
    <div className="pattern-bg min-h-screen bg-slate-100 text-slate-900 dark:bg-night dark:text-slate-100">
      <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenSettings={() => setSettingsOpen(true)} />

      <main className="mx-auto grid max-w-6xl gap-4 px-4 py-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <LocationSelector
            location={settings.location}
            onSelect={(city) => setSettings((prev) => ({ ...prev, location: city }))}
            onGeolocate={geolocate}
          />

          {error && (
            <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </p>
          )}

          {!settings.location && (
            <p className="glass rounded-3xl p-6 text-sm text-slate-600 dark:text-slate-300">
              Localisez-vous ou recherchez une ville pour afficher les horaires de prière.
            </p>
          )}

          {loading && <p className="text-sm text-slate-500">Chargement des horaires…</p>}

          {nextPrayer && <Countdown nextPrayer={nextPrayer} />}

          {timings && (
            <section className="grid gap-3 sm:grid-cols-2">
              {PRAYER_ORDER.map((name, index) => (
                <PrayerCard
                  key={name}
                  name={name}
                  time={String(timings[name]).slice(0, 5)}
                  highlighted={nextPrayer?.name === name}
                  delay={index * 0.05}
                />
              ))}
            </section>
          )}

          {timings && (
            <section className="grid gap-3 sm:grid-cols-2">
              {extra.map((name) => (
                <PrayerCard key={name} name={name} time={String(timings[name]).slice(0, 5)} />
              ))}
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <DateHeader date={payload?.date} />
          <QiblaCompass qibla={qibla} />
        </aside>
      </main>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
        methods={methods}
      />
    </div>
  );
}
