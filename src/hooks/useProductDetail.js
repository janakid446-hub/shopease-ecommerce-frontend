import { useEffect, useState } from 'react';
import { productService } from '../services/productService.js';

export function useProductDetail(productId) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setIsLoading(true);
        setError('');

        const productResponse = await productService.getProductById(productId);
        const nextProduct = productResponse.data;

        let nextRelatedProducts = [];

        if (nextProduct?.category) {
          const relatedResponse = await productService.getProductsByCategory(
            nextProduct.category,
          );

          nextRelatedProducts = (relatedResponse.data?.products ?? [])
            .filter((item) => item.id !== nextProduct.id)
            .slice(0, 5);
        }

        if (isMounted) {
          setProduct(nextProduct);
          setRelatedProducts(nextRelatedProducts);
        }
      } catch {
        if (isMounted) {
          setError('We could not load this product right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return { error, isLoading, product, relatedProducts };
}
