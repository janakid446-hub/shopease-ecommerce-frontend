import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { Pagination } from '../components/product/Pagination.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton.jsx';
import { ProductFilters } from '../components/product/ProductFilters.jsx';
import { ProductSortBar } from '../components/product/ProductSortBar.jsx';
import { ROUTES } from '../constants/routes.js';
import { useProducts } from '../hooks/useProducts.js';

const defaultFilters = {
  category: '',
  page: '1',
  price: '2000',
  rating: '0',
  sort: 'default',
};

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    category: searchParams.get('category') ?? defaultFilters.category,
    page: searchParams.get('page') ?? defaultFilters.page,
    price: searchParams.get('price') ?? defaultFilters.price,
    rating: searchParams.get('rating') ?? defaultFilters.rating,
    sort: searchParams.get('sort') ?? defaultFilters.sort,
  };
  const currentPage = Number(filters.page) || 1;
  const { categories, error, isLoading, pageCount, products } = useProducts({
    ...filters,
    page: currentPage,
  });

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (!value || value === defaultFilters[key]) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    if (key !== 'page') {
      nextParams.delete('page');
    }

    setSearchParams(nextParams);
  }

  function resetFilters() {
    setSearchParams({});
  }

  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Products' },
          ]}
        />

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
            Explore products
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Filter, sort, and page through a responsive product catalog powered by
            DummyJSON.
          </p>
        </div>

        {error && <StateBlock message={error} title="Products unavailable" />}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ProductFilters
            categories={categories}
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />

          <div>
            <ProductSortBar
              count={products.length}
              filters={filters}
              onFilterChange={updateFilter}
            />

            {isLoading && (
              <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!isLoading && products.length === 0 && !error && (
              <StateBlock
                message="Try resetting filters or choosing another category."
                title="No products match your filters"
              />
            )}

            {!isLoading && products.length > 0 && (
              <>
                <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPageChange={(page) => updateFilter('page', String(page))}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
