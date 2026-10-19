import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { PRAYER_META } from '../lib/prayer';

function Unit({ value, label }) {
  return (
    <div className="min-w-[72px] rounded-2xl bg-white/70 px-3 py-3 text-center dark:bg-night/70">
      <p className="font-mono text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

export default function Countdown({ nextPrayer }) {
  const remaining = useCountdown(nextPrayer?.at);
  const meta = PRAYER_META[nextPrayer?.name] || { label: '—', arabic: '' };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 p-5 text-white shadow-xl md:p-7"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold/30" />
      <div className="pointer-events-none absolute -bottom-16 right-10 h-48 w-48 rounded-full border border-white/10" />
      <p className="text-xs uppercase tracking-[0.25em] text-emerald-100">Prochaine prière</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-semibold">{meta.label}</h2>
          <p className="font-arabic text-2xl text-gold">{meta.arabic}</p>
        </div>
        <p className="text-sm text-emerald-100">
          {nextPrayer?.at?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Unit value={remaining.hours} label="Heures" />
        <Unit value={remaining.minutes} label="Minutes" />
        <Unit value={remaining.seconds} label="Secondes" />
      </div>
    </motion.section>
  );
}
