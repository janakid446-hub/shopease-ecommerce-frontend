import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { CartItem } from '../components/cart/CartItem.jsx';
import { ROUTES } from '../constants/routes.js';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/formatters.js';

export function CartPage() {
  const { cartItems, clearCart, itemCount, subtotal } = useCart();
  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Cart' },
          ]}
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Shopping cart
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
              Your cart
            </h1>
          </div>
          {cartItems.length > 0 && (
            <button
              className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-secondary shadow-sm transition hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-offset-secondary"
              type="button"
              onClick={clearCart}
            >
              Clear cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <StateBlock
            message="Add products from the catalog and they will be saved here."
            title="Your cart is empty"
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem item={item} key={item.product.id} />
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-28">
              <h2 className="text-xl font-extrabold text-secondary dark:text-white">
                Order summary
              </h2>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex justify-between text-lg font-extrabold text-secondary dark:text-white">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
              <Link
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                to={ROUTES.products}
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
