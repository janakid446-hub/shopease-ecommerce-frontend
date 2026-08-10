import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { formatCurrency } from '../../utils/formatters.js';

export function SearchSuggestions({
  error,
  isLoading,
  onSelect,
  products,
  query,
}) {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      {isLoading && (
        <div className="flex items-center gap-3 px-4 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin text-primary" />
          Searching products
        </div>
      )}

      {!isLoading && error && (
        <p className="px-4 py-4 text-sm font-semibold text-red-600 dark:text-red-300">
          {error}
        </p>
      )}

      {!isLoading && !error && products.length === 0 && (
        <p className="px-4 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
          No suggestions found
        </p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <ul className="max-h-80 overflow-y-auto p-2">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-2xl p-2 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary dark:hover:bg-slate-800 sm:grid-cols-[48px_minmax(0,1fr)_auto]"
                to={`${ROUTES.products}/${product.id}`}
                onClick={onSelect}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                  <img
                    alt=""
                    className="h-full w-full object-contain"
                    decoding="async"
                    loading="lazy"
                    src={product.thumbnail}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-secondary dark:text-white">
                    {product.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                    {product.category}
                  </span>
                </span>
                <span className="hidden text-sm font-extrabold text-primary sm:block">
                  {formatCurrency(product.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
