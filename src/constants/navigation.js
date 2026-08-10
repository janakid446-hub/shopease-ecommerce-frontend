import { ROUTES } from './routes.js';

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'Products', path: ROUTES.products },
  { label: 'Deals', path: ROUTES.deals },
  { label: 'Support', path: ROUTES.support },
];

export const FOOTER_LINK_GROUPS = [
  {
    title: 'Shop',
    links: [
      { label: 'Products', path: ROUTES.products },
      { label: 'Cart', path: ROUTES.cart },
      { label: 'Wishlist', path: ROUTES.wishlist },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: ROUTES.support },
      { label: 'Contact', path: ROUTES.support },
      { label: 'Help Center', path: ROUTES.support },
    ],
  },
];
