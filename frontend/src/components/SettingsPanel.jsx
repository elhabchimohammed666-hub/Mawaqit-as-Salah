import { X } from 'lucide-react';
import { DEFAULT_METHODS } from '../lib/prayer';

export default function SettingsPanel({ open, onClose, settings, setSettings, methods }) {
  if (!open) return null;
  const list = methods?.length ? methods : DEFAULT_METHODS;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 md:items-center">
      <div className="glass w-full max-w-lg rounded-3xl p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Méthodes de calcul</h2>
          <button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-white/5">
            <X size={18} />
          </button>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Méthode</label>
        <select
          value={settings.method}
          onChange={(e) => setSettings((prev) => ({ ...prev, method: Number(e.target.value) }))}
          className="mb-4 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm dark:border-white/10 dark:bg-night dark:text-white"
        >
          {list.map((method) => (
            <option key={method.id} value={method.id}>
              {method.id}. {method.name}
            </option>
          ))}
        </select>

        <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Asr</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 0, label: 'Standard (Shafi, Maliki, Hanbali)' },
            { id: 1, label: 'Hanafi' },
          ].map((school) => (
            <button
              key={school.id}
              onClick={() => setSettings((prev) => ({ ...prev, school: school.id }))}
              className={`rounded-2xl p-3 text-left text-sm ${
                settings.school === school.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200'
              }`}
            >
              {school.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
