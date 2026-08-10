import { motion } from 'framer-motion';
import { ROUTES } from '../../constants/routes.js';
import { SectionHeader } from '../common/SectionHeader.jsx';
import { StateBlock } from '../common/StateBlock.jsx';
import { ProductCard } from '../product/ProductCard.jsx';
import { ProductCardSkeleton } from '../product/ProductCardSkeleton.jsx';

export function ProductShowcase({
  actionLabel = 'View all',
  description,
  eyebrow,
  isLoading,
  products,
  title,
}) {
  return (
    <section className="bg-background py-16 dark:bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          actionLabel={actionLabel}
          actionTo={ROUTES.products}
          description={description}
          eyebrow={eyebrow}
          title={title}
        />

        {isLoading && (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <StateBlock
            message="Products will appear here once the catalog returns results."
            title="No products found"
          />
        )}

        {!isLoading && products.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product, index) => (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 18 }}
                key={product.id}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
