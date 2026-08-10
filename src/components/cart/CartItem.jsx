import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { useCart } from '../../hooks/useCart.js';
import { formatCurrency } from '../../utils/formatters.js';

export function CartItem({ item }) {
  const { product, quantity } = item;
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <article className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[120px_1fr_auto] sm:items-center">
      <Link
        className="aspect-square rounded-2xl bg-slate-100 p-3 dark:bg-slate-800"
        to={`${ROUTES.products}/${product.id}`}
      >
        <img
          alt={product.title}
          className="h-full w-full object-contain"
          decoding="async"
          loading="lazy"
          src={product.thumbnail}
        />
      </Link>

      <div>
        <Link to={`${ROUTES.products}/${product.id}`}>
          <h2 className="text-base font-bold text-secondary transition hover:text-primary dark:text-white">
            {product.title}
          </h2>
        </Link>
        <p className="mt-2 text-sm font-semibold text-primary">
          {formatCurrency(product.price)}
        </p>
        <div className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-background p-1 dark:border-slate-700 dark:bg-slate-950">
          <button
            aria-label={`Decrease quantity for ${product.title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-900"
            type="button"
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus aria-hidden="true" className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center text-sm font-bold text-secondary dark:text-white">
            {quantity}
          </span>
          <button
            aria-label={`Increase quantity for ${product.title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-900"
            type="button"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-lg font-extrabold text-secondary dark:text-white">
          {formatCurrency(product.price * quantity)}
        </p>
        <button
          aria-label={`Remove ${product.title} from cart`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:focus:ring-offset-slate-900"
          type="button"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash2 aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
