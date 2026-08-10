import { useEffect, useMemo, useState } from 'react';
import { API_CONFIG } from '../constants/api.js';
import { productService } from '../services/productService.js';

const sorters = {
  default: () => 0,
  'price-asc': (first, second) => first.price - second.price,
  'price-desc': (first, second) => second.price - first.price,
  'rating-desc': (first, second) => second.rating - first.rating,
  'discount-desc': (first, second) =>
    second.discountPercentage - first.discountPercentage,
};

function getCategorySlug(category) {
  return typeof category === 'string' ? category : category.slug;
}

export function useProducts({ category, page, price, rating, sort }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = API_CONFIG.defaultLimit;

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError('');

        const skip = (page - 1) * limit;
        const productsRequest = category
          ? productService.getProductsByCategory(category)
          : productService.getProducts({ limit, skip });

        const [productsResponse, categoriesResponse] = await Promise.all([
          productsRequest,
          productService.getCategories(),
        ]);

        if (!isMounted) {
          return;
        }

        const nextProducts = productsResponse.data?.products ?? [];

        setProducts(nextProducts);
        setTotal(
          category
            ? nextProducts.length
            : productsResponse.data?.total ?? nextProducts.length,
        );
        setCategories((categoriesResponse.data ?? []).map(getCategorySlug));
      } catch {
        if (isMounted) {
          setError('We could not load products right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [category, limit, page]);

  const filteredProducts = useMemo(() => {
    const maxPrice = Number(price);
    const minRating = Number(rating);

    return [...products]
      .filter((product) => product.price <= maxPrice)
      .filter((product) => product.rating >= minRating)
      .sort(sorters[sort] ?? sorters.default);
  }, [price, products, rating, sort]);

  const pageCount = category ? 1 : Math.max(1, Math.ceil(total / limit));

  return {
    categories,
    error,
    isLoading,
    pageCount,
    products: filteredProducts,
    total,
  };
}
