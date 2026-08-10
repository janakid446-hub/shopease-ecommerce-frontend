import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

export function BadgeLink({ count = 0, icon: Icon, label, to }) {
  return (
    <Link
      aria-label={`${label}, ${count} items`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-primary dark:hover:text-white dark:focus:ring-offset-secondary"
      to={to}
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
      <span
        className={cn(
          'absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold leading-none text-secondary shadow-sm',
          count > 99 && 'min-w-7',
        )}
      >
        {count > 99 ? '99+' : count}
      </span>
    </Link>
  );
}
