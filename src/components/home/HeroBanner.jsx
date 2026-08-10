import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { formatCurrency } from '../../utils/formatters.js';

export function HeroBanner({ product }) {
  return (
    <section className="overflow-hidden bg-background dark:bg-secondary">
      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm dark:border-blue-500/20 dark:bg-slate-900">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Premium picks, effortless checkout
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-secondary dark:text-white sm:text-5xl lg:text-6xl">
            Modern shopping built around speed, clarity, and style.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Discover curated essentials, trending finds, and limited offers in a
            refined storefront designed for every screen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-secondary"
              to={ROUTES.products}
            >
              Shop products
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-secondary shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-offset-secondary"
              to={ROUTES.deals}
            >
              View deals
            </Link>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
        >
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="aspect-square rounded-3xl bg-slate-100 p-8 dark:bg-slate-800">
              {product ? (
                <img
                  alt={product.title}
                  className="h-full w-full object-contain"
                  decoding="async"
                  fetchPriority="high"
                  src={product.thumbnail}
                />
              ) : (
                <div className="h-full w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700" />
              )}
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">Featured</p>
                <h2 className="mt-1 line-clamp-1 text-lg font-bold text-secondary dark:text-white">
                  {product?.title ?? 'Loading product'}
                </h2>
              </div>
              {product && (
                <p className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-extrabold text-secondary">
                  {formatCurrency(product.price)}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
