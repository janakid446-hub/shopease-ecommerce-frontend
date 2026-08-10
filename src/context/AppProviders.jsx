import { Toaster } from 'react-hot-toast';
import { CartProvider } from './CartContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { WishlistProvider } from './WishlistContext.jsx';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
