import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton.jsx';
import { ROUTES } from '../constants/routes.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { useSearchProducts } from '../hooks/useSearchProducts.js';

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(routeQuery);
  const debouncedQuery = useDebounce(query, 300);
  const { error, isLoading, products, total } = useSearchProducts(debouncedQuery, {
    enabled: true,
    limit: 30,
  });

  useEffect(() => {
    setQuery(routeQuery);
  }, [routeQuery]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    const currentRouteQuery = searchParams.get('q') ?? '';

    if (trimmedQuery && trimmedQuery !== currentRouteQuery) {
      setSearchParams({ q: trimmedQuery });
    }

    if (!trimmedQuery && currentRouteQuery) {
      setSearchParams({});
    }
  }, [debouncedQuery, searchParams, setSearchParams]);

  const title = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return 'Search products';
    }

    return `Search results for "${debouncedQuery.trim()}"`;
  }, [debouncedQuery]);

  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Search' },
          ]}
        />

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Live search
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Results update automatically after a short pause while you type.
          </p>
        </div>

        <div className="mb-8 max-w-2xl">
          <label className="sr-only" htmlFor="search-results-input">
            Search products
          </label>
          <input
            autoComplete="off"
            className="h-14 w-full rounded-full border border-slate-200 bg-white px-6 text-base text-text shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            id="search-results-input"
            placeholder="Search products"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {error && <StateBlock message={error} title="Search unavailable" />}

        {!debouncedQuery.trim() && !error && (
          <StateBlock
            message="Type a product name, brand, or category to start searching."
            title="Start your search"
          />
        )}

        {isLoading && debouncedQuery.trim() && (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading &&
          debouncedQuery.trim() &&
          products.length === 0 &&
          !error && (
            <StateBlock
              message="Try a shorter keyword or search for another product category."
              title="No results found"
            />
          )}

        {!isLoading && products.length > 0 && !error && (
          <>
            <p className="mb-5 text-sm font-semibold text-slate-600 dark:text-slate-400">
              Found <span className="text-secondary dark:text-white">{total}</span>{' '}
              products
            </p>
            <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
