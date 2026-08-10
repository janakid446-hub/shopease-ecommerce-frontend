import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { formatCategoryName } from '../../utils/formatters.js';
import { SectionHeader } from '../common/SectionHeader.jsx';
import { StateBlock } from '../common/StateBlock.jsx';

function normalizeCategory(category) {
  if (typeof category === 'string') {
    return { name: formatCategoryName(category), slug: category };
  }

  return {
    name: category.name ?? formatCategoryName(category.slug),
    slug: category.slug ?? category.name,
  };
}

export function CategoriesSection({ categories, isLoading }) {
  const visibleCategories = categories.slice(0, 8).map(normalizeCategory);

  return (
    <section className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          description="Browse popular departments quickly and keep the path to purchase short."
          eyebrow="Categories"
          title="Shop by category"
        />

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                className="h-28 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900"
                key={index}
              />
            ))}
          </div>
        )}

        {!isLoading && visibleCategories.length === 0 && (
          <StateBlock
            message="Categories will appear here when the catalog is available."
            title="No categories found"
          />
        )}

        {!isLoading && visibleCategories.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category, index) => (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                key={category.slug}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <Link
                  className="group flex h-full items-center justify-between rounded-3xl border border-slate-200 bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:bg-white hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary dark:hover:bg-slate-900 dark:focus:ring-offset-slate-950"
                  to={`${ROUTES.products}?category=${encodeURIComponent(category.slug)}`}
                >
                  <span className="text-base font-bold text-secondary dark:text-white">
                    {category.name}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-primary"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
