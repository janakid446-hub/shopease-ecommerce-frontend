import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, pageCount, onPageChange }) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav aria-label="Product pagination" className="mt-10 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <button
          aria-label="Previous page"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800"
          disabled={currentPage === 1}
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        {Array.from({ length: pageCount }).map((_, index) => {
          const page = index + 1;

          return (
            <button
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={
                page === currentPage
                  ? 'h-10 min-w-10 rounded-full bg-primary px-3 text-sm font-bold text-white'
                  : 'h-10 min-w-10 rounded-full px-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800'
              }
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          aria-label="Next page"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800"
          disabled={currentPage === pageCount}
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
