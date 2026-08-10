import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

const baseClasses =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-primary dark:hover:text-white dark:focus:ring-offset-secondary';

export function IconButton({
  as = 'button',
  children,
  className,
  label,
  to,
  type = 'button',
  ...props
}) {
  const classes = cn(baseClasses, className);

  if (as === 'link') {
    return (
      <Link aria-label={label} className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={label} className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
