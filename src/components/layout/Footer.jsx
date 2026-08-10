import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../constants/app.js';
import { FOOTER_LINK_GROUPS } from '../../constants/navigation.js';
import { ROUTES } from '../../constants/routes.js';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 pb-28 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] md:pb-12 lg:px-8">
        <div>
          <Link
            className="text-xl font-extrabold text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-white dark:focus:ring-offset-slate-950"
            to={ROUTES.home}
          >
            {APP_CONFIG.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
            Premium shopping foundations built for fast browsing, clear navigation,
            and responsive commerce experiences.
          </p>
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-secondary dark:text-white">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-sm text-slate-600 transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-slate-400 dark:hover:text-white dark:focus:ring-offset-slate-950"
                    to={link.path}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
