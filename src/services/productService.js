import { apiClient } from './apiClient.js';

export const productService = {
  getProducts(params = {}) {
    return apiClient.get('/products', { params });
  },

  getProductById(productId) {
    return apiClient.get(`/products/${productId}`);
  },

  searchProducts(query) {
    return apiClient.get('/products/search', { params: { q: query } });
  },

  getCategories() {
    return apiClient.get('/products/categories');
  },

  getProductsByCategory(category) {
    return apiClient.get(`/products/category/${category}`);
  },
};
