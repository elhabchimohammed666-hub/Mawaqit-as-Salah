import { motion } from 'framer-motion';
import { PRAYER_META } from '../lib/prayer';

export default function PrayerCard({ name, time, highlighted, delay = 0 }) {
  const meta = PRAYER_META[name] || { label: name, arabic: '' };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl p-4 ${
        highlighted
          ? 'bg-gradient-to-br from-gold/20 to-emerald-500/10 ring-1 ring-gold/50'
          : 'glass'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">{meta.label}</p>
          <p className="font-arabic text-xl text-emerald-700 dark:text-gold">{meta.arabic}</p>
        </div>
        <p className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">{time}</p>
      </div>
      {highlighted && (
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">À venir</p>
      )}
    </motion.article>
  );
}
