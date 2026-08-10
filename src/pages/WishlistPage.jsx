import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { ROUTES } from '../constants/routes.js';
import { useWishlist } from '../hooks/useWishlist.js';

export function WishlistPage() {
  const { clearWishlist, wishlistItems } = useWishlist();

  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Wishlist' },
          ]}
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Wishlist
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
              Saved products
            </h1>
          </div>
          {wishlistItems.length > 0 && (
            <button
              className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-secondary shadow-sm transition hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-offset-secondary"
              type="button"
              onClick={clearWishlist}
            >
              Clear wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="space-y-6">
            <StateBlock
              message="Save products you love and they will remain here between visits."
              title="Your wishlist is empty"
            />
            <Link
              className="mx-auto inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-secondary"
              to={ROUTES.products}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
