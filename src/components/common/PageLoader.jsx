export function PageLoader() {
  return (
    <section className="bg-background py-10 dark:bg-secondary sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-64 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
