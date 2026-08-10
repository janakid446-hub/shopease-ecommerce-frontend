import { Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from '../../constants/app.js';
import { NAV_LINKS } from '../../constants/navigation.js';
import { ROUTES } from '../../constants/routes.js';
import { useCart } from '../../hooks/useCart.js';
import { useWishlist } from '../../hooks/useWishlist.js';
import { cn } from '../../utils/cn.js';
import { BadgeLink } from './BadgeLink.jsx';
import { IconButton } from './IconButton.jsx';
import { SearchBar } from './SearchBar.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

const linkClasses = ({ isActive }) =>
  cn(
    'rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-secondary',
    isActive
      ? 'bg-primary text-white shadow-sm'
      : 'text-slate-600 hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white',
  );

export function Navbar() {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-background/90 backdrop-blur-xl dark:border-slate-800 dark:bg-secondary/90">
      <nav
        aria-label="Primary navigation"
        className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] items-center gap-3 px-4 py-4 sm:px-6 md:grid-cols-[auto_minmax(220px,1fr)_auto] lg:grid-cols-[auto_auto_minmax(260px,1fr)_auto] lg:px-8"
      >
        <Link
          className="shrink-0 rounded-lg text-xl font-extrabold tracking-normal text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-white dark:focus:ring-offset-secondary"
          to={ROUTES.home}
          onClick={closeMenu}
        >
          {APP_CONFIG.name}
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink className={linkClasses} key={link.label} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <SearchBar className="hidden w-full justify-self-center md:block md:max-w-xl lg:max-w-md" />

        <div className="hidden items-center justify-self-end gap-2 md:flex">
          <ThemeToggle />
          <BadgeLink
            count={wishlistCount}
            icon={Heart}
            label="Wishlist"
            to={ROUTES.wishlist}
          />
          <BadgeLink
            count={itemCount}
            icon={ShoppingCart}
            label="Cart"
            to={ROUTES.cart}
          />
        </div>

        <div className="flex items-center justify-self-end gap-2 md:hidden">
          <ThemeToggle />
          <IconButton
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </IconButton>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-background px-4 pb-5 pt-4 shadow-soft dark:border-slate-800 dark:bg-secondary md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <SearchBar compact onSubmit={closeMenu} />
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  className={linkClasses}
                  key={link.label}
                  to={link.path}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <BadgeLink
                count={wishlistCount}
                icon={Heart}
                label="Wishlist"
                to={ROUTES.wishlist}
              />
              <BadgeLink
                count={itemCount}
                icon={ShoppingCart}
                label="Cart"
                to={ROUTES.cart}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
