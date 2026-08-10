import { useEffect, useMemo, useReducer } from 'react';
import toast from 'react-hot-toast';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { getStorageItem, setStorageItem } from '../utils/localStorage.js';
import { CartContext } from './cartContextValue.js';

const initialCartState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id,
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case 'remove':
      return {
        items: state.items.filter((item) => item.product.id !== action.productId),
      };

    case 'updateQuantity':
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }

      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };

    case 'clear':
      return initialCartState;

    default:
      return state;
  }
}

function getInitialCartState() {
  const storedState = getStorageItem(STORAGE_KEYS.cart, initialCartState);

  if (!Array.isArray(storedState?.items)) {
    return initialCartState;
  }

  return {
    items: storedState.items
      .filter((item) => item?.product?.id && Number.isFinite(item.quantity))
      .map((item) => ({
        product: item.product,
        quantity: Math.max(1, Math.floor(item.quantity)),
      })),
  };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, getInitialCartState);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.cart, state);
  }, [state]);

  const value = useMemo(() => {
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    return {
      addToCart: (product) => {
        dispatch({ type: 'add', product });
        toast.success(`${product.title} added to cart`);
      },
      cartItems: state.items,
      clearCart: () => {
        dispatch({ type: 'clear' });
        toast.success('Cart cleared');
      },
      itemCount,
      removeFromCart: (productId) => {
        dispatch({ type: 'remove', productId });
        toast.success('Removed from cart');
      },
      subtotal,
      updateQuantity: (productId, quantity) => {
        dispatch({ type: 'updateQuantity', productId, quantity });
      },
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
