import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-secondary dark:text-white">
          Page not found
        </h1>
        <Link className="mt-6 inline-flex font-semibold text-primary" to={ROUTES.home}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
