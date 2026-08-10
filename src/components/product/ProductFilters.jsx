import { SlidersHorizontal } from 'lucide-react';
import { formatCategoryName } from '../../utils/formatters.js';

export function ProductFilters({
  categories,
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-28">
      <div className="flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold text-secondary dark:text-white">
          <SlidersHorizontal aria-hidden="true" className="h-5 w-5 text-primary" />
          Filters
        </h2>
        <button
          className="text-sm font-bold text-primary transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          type="button"
          onClick={onReset}
        >
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <label className="block">
          <span className="text-sm font-bold text-secondary dark:text-white">
            Category
          </span>
          <select
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-background px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {formatCategoryName(category)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-center justify-between text-sm font-bold text-secondary dark:text-white">
            Max price
            <span className="text-primary">${filters.price}</span>
          </span>
          <input
            className="mt-3 w-full accent-primary"
            max="2000"
            min="10"
            step="10"
            type="range"
            value={filters.price}
            onChange={(event) => onFilterChange('price', event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-secondary dark:text-white">
            Minimum rating
          </span>
          <select
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-background px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            value={filters.rating}
            onChange={(event) => onFilterChange('rating', event.target.value)}
          >
            <option value="0">Any rating</option>
            <option value="3">3 stars and up</option>
            <option value="4">4 stars and up</option>
            <option value="4.5">4.5 stars and up</option>
          </select>
        </label>
      </div>
    </aside>
  );
}
