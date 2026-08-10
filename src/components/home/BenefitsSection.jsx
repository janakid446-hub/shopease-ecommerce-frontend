import { motion } from 'framer-motion';
import { Headphones, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader.jsx';

const benefits = [
  {
    title: 'Fast delivery',
    description: 'Responsive storefront patterns built around quick discovery.',
    icon: Truck,
  },
  {
    title: 'Secure shopping',
    description: 'Persistent cart and wishlist flows keep shopper intent intact.',
    icon: ShieldCheck,
  },
  {
    title: 'Easy returns',
    description: 'Customer-friendly actions remain visible across every viewport.',
    icon: RefreshCw,
  },
  {
    title: 'Premium support',
    description: 'Accessible navigation keeps help and account paths close.',
    icon: Headphones,
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-background py-16 dark:bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          description="Core commerce promises presented with calm, trustworthy visual hierarchy."
          eyebrow="Why ShopEase"
          title="Built for confident shopping"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
                initial={{ opacity: 0, y: 18 }}
                key={benefit.title}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary dark:bg-blue-500/10">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-secondary dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
