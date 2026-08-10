import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
              {item.to && !isLast ? (
                <Link
                  className="font-semibold transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-secondary"
                  to={item.to}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="font-semibold text-secondary dark:text-white"
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight aria-hidden="true" className="h-4 w-4" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
