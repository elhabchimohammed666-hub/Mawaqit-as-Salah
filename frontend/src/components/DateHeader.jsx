export default function DateHeader({ date }) {
  if (!date) return null;

  return (
    <section className="glass rounded-3xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-gold">Aujourd’hui</p>
      <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{date.gregorian?.date}</h2>
      <p className="mt-1 text-slate-500 dark:text-slate-300">
        {date.gregorian?.weekday?.en} · {date.gregorian?.month?.en} {date.gregorian?.year}
      </p>
      <p className="mt-4 font-arabic text-2xl text-emerald-700 dark:text-gold">
        {date.hijri?.day} {date.hijri?.month?.ar} {date.hijri?.year} هـ
      </p>
      <p className="text-sm text-slate-500">
        {date.hijri?.weekday?.en} · {date.hijri?.month?.en} {date.hijri?.year} AH
      </p>
    </section>
  );
}
