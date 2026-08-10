import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { getStorageItem, setStorageItem } from '../utils/localStorage.js';

const MAX_RECENT_PRODUCTS = 8;

export function useRecentlyViewed(product) {
  const [recentlyViewed, setRecentlyViewed] = useState(() =>
    getStorageItem(STORAGE_KEYS.recentlyViewed, []),
  );

  useEffect(() => {
    if (!product?.id) {
      return;
    }

    setRecentlyViewed((currentProducts) => {
      const nextProducts = [
        product,
        ...currentProducts.filter((item) => item.id !== product.id),
      ].slice(0, MAX_RECENT_PRODUCTS);

      setStorageItem(STORAGE_KEYS.recentlyViewed, nextProducts);
      return nextProducts;
    });
  }, [product]);

  return recentlyViewed.filter((item) => item.id !== product?.id);
}
