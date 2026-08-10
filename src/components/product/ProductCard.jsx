import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { useCart } from '../../hooks/useCart.js';
import { useWishlist } from '../../hooks/useWishlist.js';
import { cn } from '../../utils/cn.js';
import { formatCategoryName, formatCurrency } from '../../utils/formatters.js';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const productPath = `${ROUTES.products}/${product.id}`;

  return (
    <motion.article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition-shadow duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link className="block shrink-0" to={productPath}>
        <div className="relative aspect-square bg-slate-100 p-5 dark:bg-slate-800">
          <img
            alt={product.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            decoding="async"
            loading="lazy"
            src={product.thumbnail}
          />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-primary">
            {formatCategoryName(product.category)}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Star aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
            {product.rating}
          </span>
        </div>
        <Link to={productPath}>
          <h3 className="mt-3 line-clamp-2 min-h-12 text-base font-bold leading-6 text-secondary transition hover:text-primary dark:text-white">
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto flex min-w-0 items-end justify-between gap-3 pt-4">
          <div className="min-w-0">
            <p className="text-lg font-extrabold text-secondary dark:text-white">
              {formatCurrency(product.price)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs font-medium text-slate-500">
                {Math.round(product.discountPercentage)}% off
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              aria-label={`View details for ${product.title}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:focus:ring-offset-slate-900"
              to={productPath}
            >
              <Eye aria-hidden="true" className="h-4 w-4" />
            </Link>
            <button
              aria-label={
                isWishlisted
                  ? `Remove ${product.title} from wishlist`
                  : `Add ${product.title} to wishlist`
              }
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900',
                isWishlisted
                  ? 'border-primary bg-blue-50 text-primary dark:bg-blue-500/10'
                  : 'border-slate-200 text-slate-500 hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300',
              )}
              type="button"
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                aria-hidden="true"
                className={cn('h-4 w-4', isWishlisted && 'fill-current')}
              />
            </button>
            <button
              aria-label={`Add ${product.title} to cart`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              type="button"
              onClick={() => addToCart(product)}
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
