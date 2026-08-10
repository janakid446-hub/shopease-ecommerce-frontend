export function ProductSortBar({ count, filters, onFilterChange }) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
        Showing <span className="text-secondary dark:text-white">{count}</span>{' '}
        products
      </p>
      <label className="flex flex-col gap-2 text-sm font-bold text-secondary dark:text-white sm:flex-row sm:items-center sm:gap-3">
        Sort
        <select
          className="h-11 w-full rounded-2xl border border-slate-200 bg-background px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:w-auto"
          value={filters.sort}
          onChange={(event) => onFilterChange('sort', event.target.value)}
        >
          <option value="default">Recommended</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating-desc">Top rated</option>
          <option value="discount-desc">Best discount</option>
        </select>
      </label>
    </div>
  );
}
