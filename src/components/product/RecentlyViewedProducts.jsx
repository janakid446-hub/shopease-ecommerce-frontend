import { SectionHeader } from '../common/SectionHeader.jsx';
import { ProductCard } from './ProductCard.jsx';

export function RecentlyViewedProducts({ products }) {
  if (!products.length) {
    return null;
  }

  return (
    <div className="mt-16">
      <SectionHeader
        description="Products you opened recently are saved locally on this device."
        title="Recently viewed"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
