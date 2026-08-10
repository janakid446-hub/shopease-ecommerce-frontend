import { BenefitsSection } from '../components/home/BenefitsSection.jsx';
import { CategoriesSection } from '../components/home/CategoriesSection.jsx';
import { FlashSaleSection } from '../components/home/FlashSaleSection.jsx';
import { HeroBanner } from '../components/home/HeroBanner.jsx';
import { NewsletterSection } from '../components/home/NewsletterSection.jsx';
import { ProductShowcase } from '../components/home/ProductShowcase.jsx';
import { StateBlock } from '../components/common/StateBlock.jsx';
import { useHomeData } from '../hooks/useHomeData.js';

export function HomePage() {
  const { categories, error, isLoading, products } = useHomeData();
  const featuredProducts = products.slice(0, 5);
  const trendingProducts = [...products]
    .sort((first, second) => second.rating - first.rating)
    .slice(0, 5);
  const flashSaleProduct = [...products].sort(
    (first, second) => second.discountPercentage - first.discountPercentage,
  )[0];

  return (
    <>
      <HeroBanner product={products[0]} />

      {error && (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <StateBlock message={error} title="Storefront unavailable" />
        </div>
      )}

      <CategoriesSection categories={categories} isLoading={isLoading} />
      <ProductShowcase
        description="A polished mix of best-value products pulled from the live catalog."
        eyebrow="Featured"
        isLoading={isLoading}
        products={featuredProducts}
        title="Featured products"
      />
      <FlashSaleSection isLoading={isLoading} product={flashSaleProduct} />
      <ProductShowcase
        description="High-rated products highlighted for shoppers who want confidence fast."
        eyebrow="Trending"
        isLoading={isLoading}
        products={trendingProducts}
        title="Trending now"
      />
      <BenefitsSection />
      <NewsletterSection />
    </>
  );
}
