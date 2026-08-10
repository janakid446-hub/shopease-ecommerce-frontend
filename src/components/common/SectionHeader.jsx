import { Link } from 'react-router-dom';

export function SectionHeader({ eyebrow, title, description, actionLabel, actionTo }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-bold text-secondary dark:text-white sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionTo && (
        <Link
          className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:focus:ring-offset-secondary"
          to={actionTo}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
