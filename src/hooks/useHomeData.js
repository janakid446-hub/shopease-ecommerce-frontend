import { useEffect, useState } from 'react';
import { productService } from '../services/productService.js';

const initialState = {
  categories: [],
  products: [],
};

export function useHomeData() {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        setIsLoading(true);
        setError('');

        const [productsResponse, categoriesResponse] = await Promise.all([
          productService.getProducts({ limit: 12, skip: 0 }),
          productService.getCategories(),
        ]);

        if (!isMounted) {
          return;
        }

        setData({
          categories: categoriesResponse.data ?? [],
          products: productsResponse.data?.products ?? [],
        });
      } catch {
        if (isMounted) {
          setError('We could not load the storefront right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { ...data, error, isLoading };
}
