import { useEffect, useMemo, useReducer } from 'react';
import toast from 'react-hot-toast';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { getStorageItem, setStorageItem } from '../utils/localStorage.js';
import { WishlistContext } from './wishlistContextValue.js';

const initialWishlistState = {
  items: [],
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'add':
      if (state.items.some((product) => product.id === action.product.id)) {
        return state;
      }

      return {
        items: [...state.items, action.product],
      };

    case 'remove':
      return {
        items: state.items.filter((product) => product.id !== action.productId),
      };

    case 'clear':
      return initialWishlistState;

    default:
      return state;
  }
}

function getInitialWishlistState() {
  const storedState = getStorageItem(STORAGE_KEYS.wishlist, initialWishlistState);

  if (!Array.isArray(storedState?.items)) {
    return initialWishlistState;
  }

  return {
    items: storedState.items.filter((product) => product?.id),
  };
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    initialWishlistState,
    getInitialWishlistState,
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.wishlist, state);
  }, [state]);

  const value = useMemo(
    () => ({
      addToWishlist: (product) => {
        dispatch({ type: 'add', product });
        toast.success(`${product.title} saved`);
      },
      clearWishlist: () => {
        dispatch({ type: 'clear' });
        toast.success('Wishlist cleared');
      },
      isInWishlist: (productId) =>
        state.items.some((product) => product.id === productId),
      removeFromWishlist: (productId) => {
        dispatch({ type: 'remove', productId });
        toast.success('Removed from wishlist');
      },
      toggleWishlist: (product) => {
        const isSaved = state.items.some((item) => item.id === product.id);

        dispatch({
          type: isSaved ? 'remove' : 'add',
          product,
          productId: product.id,
        });
        toast.success(isSaved ? 'Removed from wishlist' : `${product.title} saved`);
      },
      wishlistCount: state.items.length,
      wishlistItems: state.items,
    }),
    [state.items],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}
