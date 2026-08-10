import { useEffect, useState } from 'react';
import { productService } from '../services/productService.js';

export function useSearchProducts(query, { enabled = true, limit = 12 } = {}) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const trimmedQuery = query.trim();

    if (!enabled || !trimmedQuery) {
      setProducts([]);
      setTotal(0);
      setError('');
      setIsLoading(false);
      return undefined;
    }

    async function searchProducts() {
      try {
        setIsLoading(true);
        setError('');

        const response = await productService.searchProducts(trimmedQuery);
        const nextProducts = response.data?.products ?? [];

        if (isMounted) {
          setProducts(nextProducts.slice(0, limit));
          setTotal(response.data?.total ?? nextProducts.length);
        }
      } catch {
        if (isMounted) {
          setError('Search is unavailable right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    searchProducts();

    return () => {
      isMounted = false;
    };
  }, [enabled, limit, query]);

  return { error, isLoading, products, total };
}
