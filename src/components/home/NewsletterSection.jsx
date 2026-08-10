import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export function NewsletterSection() {
  function handleSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success('Thanks for subscribing');
  }

  return (
    <section className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-background p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Newsletter
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-secondary dark:text-white sm:text-3xl">
                Get curated drops and private offers.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                Stay close to product drops, seasonal picks, and private shopping
                offers.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm text-text outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                id="newsletter-email"
                placeholder="Email address"
                required
                type="email"
              />
              <button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                type="submit"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
