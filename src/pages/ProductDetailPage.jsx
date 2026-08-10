import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { SectionHeader } from '../components/common/SectionHeader.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { ProductGallery } from '../components/product/ProductGallery.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton.jsx';
import { ProductShare } from '../components/product/ProductShare.jsx';
import { RecentlyViewedProducts } from '../components/product/RecentlyViewedProducts.jsx';
import { ROUTES } from '../constants/routes.js';
import { useCart } from '../hooks/useCart.js';
import { useProductDetail } from '../hooks/useProductDetail.js';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js';
import { useWishlist } from '../hooks/useWishlist.js';
import { cn } from '../utils/cn.js';
import { formatCategoryName, formatCurrency } from '../utils/formatters.js';

export function ProductDetailPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { error, isLoading, product, relatedProducts } =
    useProductDetail(productId);
  const recentlyViewed = useRecentlyViewed(product);

  if (isLoading) {
    return (
      <section className="bg-background py-10 dark:bg-secondary sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-[2rem] bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-5">
              <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-24 w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="bg-background py-10 dark:bg-secondary sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StateBlock
            message={error || 'This product could not be found.'}
            title="Product unavailable"
          />
        </div>
      </section>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Products', to: ROUTES.products },
            { label: product.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ProductGallery product={product} />

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {formatCategoryName(product.category)}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                <Star aria-hidden="true" className="h-4 w-4 fill-current" />
                {product.rating}
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                {product.stock} in stock
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-primary dark:bg-blue-500/10">
                {Math.round(product.discountPercentage)}% off
              </span>
            </div>
            <p className="mt-6 text-4xl font-extrabold text-secondary dark:text-white">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
              {product.description}
            </p>
            <ProductShare product={product} />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-secondary"
                type="button"
                onClick={() => addToCart(product)}
              >
                <ShoppingBag aria-hidden="true" className="h-5 w-5" />
                Add to cart
              </button>
              <button
                className={cn(
                  'inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-bold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-secondary',
                  isWishlisted
                    ? 'border-primary bg-blue-50 text-primary dark:bg-blue-500/10'
                    : 'border-slate-200 bg-white text-secondary hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white',
                )}
                type="button"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  aria-hidden="true"
                  className={cn('h-5 w-5', isWishlisted && 'fill-current')}
                />
                {isWishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <div className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:grid-cols-2">
              <p>
                <span className="font-bold text-secondary dark:text-white">
                  Brand:
                </span>{' '}
                {product.brand ?? 'ShopEase'}
              </p>
              <p>
                <span className="font-bold text-secondary dark:text-white">
                  SKU:
                </span>{' '}
                {product.sku ?? `SE-${product.id}`}
              </p>
              <p>
                <span className="font-bold text-secondary dark:text-white">
                  Warranty:
                </span>{' '}
                {product.warrantyInformation ?? 'Standard warranty'}
              </p>
              <p>
                <span className="font-bold text-secondary dark:text-white">
                  Shipping:
                </span>{' '}
                {product.shippingInformation ?? 'Fast shipping'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            description="More products from the same category."
            title="Related products"
          />
          {relatedProducts.length > 0 ? (
            <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
        </div>
        <RecentlyViewedProducts products={recentlyViewed} />
      </div>
    </section>
  );
}
