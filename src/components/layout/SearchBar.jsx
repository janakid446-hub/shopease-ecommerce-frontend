import { Search } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useSearchProducts } from '../../hooks/useSearchProducts.js';
import { cn } from '../../utils/cn.js';
import { SearchSuggestions } from '../search/SearchSuggestions.jsx';

export function SearchBar({ className, compact = false, onSubmit }) {
  const inputId = useId();
  const location = useLocation();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const {
    error,
    isLoading,
    products: suggestions,
  } = useSearchProducts(debouncedQuery, {
    enabled: isFocused,
    limit: 5,
  });

  useEffect(() => {
    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const routeQuery = params.get('q') ?? '';

    if (location.pathname === ROUTES.search) {
      setQuery(routeQuery);
    }
  }, [location.pathname, location.search]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSubmit?.(trimmedQuery);
    setIsFocused(false);
    navigate(`${ROUTES.search}?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form
      className={cn(
        'relative w-full',
        compact ? 'max-w-none' : 'max-w-xl',
        className,
      )}
      ref={wrapperRef}
      role="search"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={inputId}>
        Search products
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      />
      <input
        autoComplete="off"
        className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-5 text-sm text-text shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
        id={inputId}
        name="search"
        placeholder="Search products"
        type="search"
        value={query}
        onFocus={() => setIsFocused(true)}
        onChange={(event) => setQuery(event.target.value)}
      />
      {isFocused && (
        <SearchSuggestions
          error={error}
          isLoading={isLoading}
          products={suggestions}
          query={debouncedQuery}
          onSelect={() => {
            setIsFocused(false);
            onSubmit?.(debouncedQuery);
          }}
        />
      )}
    </form>
  );
}
