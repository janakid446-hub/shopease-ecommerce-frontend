import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton.jsx';
import { ROUTES } from '../constants/routes.js';
import { useHomeData } from '../hooks/useHomeData.js';

export function DealsPage() {
  const { error, isLoading, products } = useHomeData();
  const dealProducts = [...products]
    .filter((product) => product.discountPercentage > 8)
    .sort((first, second) => second.discountPercentage - first.discountPercentage);

  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Deals' },
          ]}
        />

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Limited offers
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
            Today&apos;s best deals
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Browse high-value products with standout discounts from the live
            catalog.
          </p>
        </div>

        {error && <StateBlock message={error} title="Deals unavailable" />}

        {isLoading && (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && !error && dealProducts.length === 0 && (
          <StateBlock
            message="Check back soon for fresh offers from the catalog."
            title="No deals found"
          />
        )}

        {!isLoading && dealProducts.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
