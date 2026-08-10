import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageLoader } from './components/common/PageLoader.jsx';
import { ROUTES } from './constants/routes.js';
import { MainLayout } from './layouts/MainLayout.jsx';

const CartPage = lazy(() =>
  import('./pages/CartPage.jsx').then((module) => ({ default: module.CartPage })),
);
const DealsPage = lazy(() =>
  import('./pages/DealsPage.jsx').then((module) => ({ default: module.DealsPage })),
);
const HomePage = lazy(() =>
  import('./pages/HomePage.jsx').then((module) => ({ default: module.HomePage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.jsx').then((module) => ({
    default: module.NotFoundPage,
  })),
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage.jsx').then((module) => ({
    default: module.ProductDetailPage,
  })),
);
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage.jsx').then((module) => ({
    default: module.ProductsPage,
  })),
);
const SearchResultsPage = lazy(() =>
  import('./pages/SearchResultsPage.jsx').then((module) => ({
    default: module.SearchResultsPage,
  })),
);
const SupportPage = lazy(() =>
  import('./pages/SupportPage.jsx').then((module) => ({
    default: module.SupportPage,
  })),
);
const WishlistPage = lazy(() =>
  import('./pages/WishlistPage.jsx').then((module) => ({
    default: module.WishlistPage,
  })),
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.products} element={<ProductsPage />} />
          <Route
            path={`${ROUTES.products}/:productId`}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.deals} element={<DealsPage />} />
          <Route path={ROUTES.search} element={<SearchResultsPage />} />
          <Route path={ROUTES.cart} element={<CartPage />} />
          <Route path={ROUTES.wishlist} element={<WishlistPage />} />
          <Route path={ROUTES.support} element={<SupportPage />} />
          <Route path={ROUTES.notFound} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
