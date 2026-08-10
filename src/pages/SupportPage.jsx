import { Headphones, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { ROUTES } from '../constants/routes.js';

const supportOptions = [
  {
    title: 'Order help',
    description: 'Track orders, review delivery updates, and manage purchase details.',
    icon: Headphones,
  },
  {
    title: 'Returns',
    description: 'Start a simple return flow for eligible products.',
    icon: ShieldCheck,
  },
  {
    title: 'Live chat',
    description: 'Get quick answers for product, cart, and account questions.',
    icon: MessageCircle,
  },
  {
    title: 'Email support',
    description: 'Reach the team at support@shopease.example.',
    icon: Mail,
  },
];

export function SupportPage() {
  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.home },
            { label: 'Support' },
          ]}
        />

        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Support center
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-secondary dark:text-white sm:text-4xl">
            Help when shoppers need it.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Clear support paths keep customers confident before and after purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportOptions.map((option) => {
            const Icon = option.icon;

            return (
              <article
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
                key={option.title}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary dark:bg-blue-500/10">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-lg font-bold text-secondary dark:text-white">
                  {option.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {option.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
