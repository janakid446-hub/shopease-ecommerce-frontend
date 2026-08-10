export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-square animate-pulse bg-slate-200 dark:bg-slate-800" />
      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mt-auto h-8 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
