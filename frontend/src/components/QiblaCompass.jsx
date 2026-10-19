import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QiblaCompass({ qibla }) {
  const direction = Number(qibla?.direction || 0);

  return (
    <section className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <Compass size={18} className="text-emerald-500" />
        <h2 className="font-semibold text-slate-900 dark:text-white">Qibla</h2>
      </div>
      <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-emerald-500/30 bg-gradient-to-b from-white to-emerald-50 dark:from-night dark:to-card">
        <motion.div
          animate={{ rotate: direction }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          className="relative h-36 w-36"
        >
          <div className="absolute left-1/2 top-0 h-16 w-1 -translate-x-1/2 rounded-full bg-gold" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" />
          <span className="absolute left-1/2 top-16 -translate-x-1/2 text-xs font-semibold text-gold">N</span>
        </motion.div>
      </div>
      <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-300">
        Direction : <span className="font-semibold text-slate-800 dark:text-white">{direction.toFixed(1)}°</span> par
        rapport au nord
      </p>
    </section>
  );
}
