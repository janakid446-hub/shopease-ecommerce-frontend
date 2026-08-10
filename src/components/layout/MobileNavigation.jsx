import { Heart, Home, Search, ShoppingCart, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { useCart } from '../../hooks/useCart.js';
import { useWishlist } from '../../hooks/useWishlist.js';
import { cn } from '../../utils/cn.js';

export function MobileNavigation() {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const items = [
    { label: 'Home', path: ROUTES.home, icon: Home },
    { label: 'Products', path: ROUTES.products, icon: Store },
    { label: 'Search', path: ROUTES.search, icon: Search },
    { label: 'Wishlist', path: ROUTES.wishlist, icon: Heart, count: wishlistCount },
    { label: 'Cart', path: ROUTES.cart, icon: ShoppingCart, count: itemCount },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_35px_-28px_rgba(15,23,42,0.8)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.label}>
              <NavLink
                aria-label={item.label}
                className={({ isActive }) =>
                  cn(
                    'relative flex h-12 items-center justify-center rounded-2xl transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white',
                  )
                }
                to={item.path}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                {typeof item.count === 'number' && (
                  <span className="absolute right-2 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-secondary shadow-sm">
                    {item.count > 99 ? '99+' : item.count}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
