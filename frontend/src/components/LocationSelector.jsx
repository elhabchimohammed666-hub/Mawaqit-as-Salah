import { useEffect, useState } from 'react';
import { LocateFixed, MapPin, Search } from 'lucide-react';
import { searchCities } from '../api/client';

export default function LocationSelector({ location, onSelect, onGeolocate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return undefined;
    }

    const id = setTimeout(async () => {
      setSearching(true);
      try {
        setResults(await searchCities(query.trim()));
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <section className="glass relative z-20 rounded-3xl p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-gold">Localisation</p>
          <h2 className="mt-1 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
            <MapPin size={18} className="text-emerald-500" />
            {location ? `${location.name}${location.country ? `, ${location.country}` : ''}` : 'Choisir une ville'}
          </h2>
        </div>
        <button
          onClick={onGeolocate}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
        >
          <LocateFixed size={16} />
          Me localiser
        </button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une ville (Paris, Casablanca, Istanbul…)"
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none ring-emerald-500/30 focus:ring-2 dark:border-white/10 dark:bg-night dark:text-white"
        />
      </div>

      {(searching || results.length > 0) && (
        <ul className="absolute z-20 mt-2 w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-card md:w-[calc(100%-2.5rem)]">
          {searching && <li className="px-4 py-3 text-sm text-slate-500">Recherche…</li>}
          {results.map((item) => (
            <li key={item.id}>
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-50 dark:hover:bg-white/5"
                onClick={() => {
                  onSelect(item);
                  setQuery('');
                  setResults([]);
                }}
              >
                <span className="block font-medium text-slate-800 dark:text-white">{item.name}</span>
                <span className="block truncate text-xs text-slate-500">{item.displayName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
