export function StateBlock({ title, message }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-secondary dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
}
