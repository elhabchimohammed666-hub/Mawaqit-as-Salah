import { Moon, Settings2, Sun, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ theme, onToggleTheme, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-30 mx-auto w-full max-w-6xl px-4 pt-4">
      <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="font-arabic text-lg leading-none text-emerald-700 dark:text-gold">مواقيت الصلاة</p>
            <h1 className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100">
              Mawaqit as-Salah
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
            aria-label="Basculer le thème"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSettings}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
            aria-label="Paramètres"
          >
            <Settings2 size={18} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
