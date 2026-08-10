import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { formatCurrency } from '../../utils/formatters.js';

export function FlashSaleSection({ product, isLoading }) {
  return (
    <section className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-secondary shadow-soft dark:border-slate-800 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="p-8 text-white sm:p-10 lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-amber-200">
              <Flame aria-hidden="true" className="h-4 w-4" />
              Flash sale
            </span>
            <h2 className="mt-6 text-3xl font-extrabold sm:text-4xl">
              Limited-time savings on standout picks.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Curated discounts refresh from the catalog, giving shoppers a clear
              path to high-value finds.
            </p>
            <div className="mt-8 grid max-w-sm grid-cols-3 gap-3">
              {['12h', '34m', '56s'].map((time) => (
                <div className="rounded-2xl bg-white/10 p-4 text-center" key={time}>
                  <p className="text-2xl font-extrabold">{time.slice(0, -1)}</p>
                  <p className="mt-1 text-xs font-semibold uppercase text-slate-300">
                    {time.slice(-1)}
                  </p>
                </div>
              ))}
            </div>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-extrabold text-secondary transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
              to={ROUTES.deals}
            >
              <Clock aria-hidden="true" className="h-4 w-4" />
              Shop sale
            </Link>
          </div>

          <div className="bg-slate-100 p-8 dark:bg-slate-900 sm:p-10 lg:p-12">
            {isLoading || !product ? (
              <div className="h-full min-h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
            ) : (
              <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-950">
                <img
                  alt={product.title}
                  className="mx-auto h-64 w-full object-contain"
                  decoding="async"
                  loading="lazy"
                  src={product.thumbnail}
                />
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">Today only</p>
                    <h3 className="mt-1 text-xl font-extrabold text-secondary dark:text-white">
                      {product.title}
                    </h3>
                  </div>
                  <p className="rounded-full bg-accent px-4 py-2 text-sm font-extrabold text-secondary">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
