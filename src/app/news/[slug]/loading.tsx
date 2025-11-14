export default function Loading() {
  return (
    <main className="min-h-screen bg-black py-16 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Title Skeleton */}
        <div className="h-12 w-3/4 mx-auto mb-12 rounded-lg bg-gradient-to-r from-[var(--matrix-color-20)] to-[var(--matrix-color-30)] animate-pulse" />

        {/* Content Skeletons */}
        <div className="space-y-8">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start gap-4 p-4">
              {/* Speaker Icon Skeleton */}
              <div className="w-6 h-6 rounded-full bg-[var(--matrix-color-30)] animate-pulse" />

              {/* Text Skeleton */}
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-[var(--matrix-color-20)] rounded w-full animate-pulse" />
                <div className="h-4 bg-[var(--matrix-color-20)] rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-[var(--matrix-color-20)] rounded w-4/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
