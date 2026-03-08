export default function TutorialsListLoading() {
  return (
    <>
      {/* Fake header skeleton */}
      <div className="shrink-0 z-10 bg-surface-900/80 backdrop-blur-sm border-b border-surface-800 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-surface-800 animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-24 bg-surface-800 animate-pulse" />
            <div className="h-4 w-36 bg-surface-800 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="h-7 w-16 sm:w-24 bg-surface-800 animate-pulse border border-surface-700" />
          <div className="hidden sm:block h-8 w-px bg-surface-800" />
          <div className="h-8 w-16 sm:w-28 bg-surface-800 animate-pulse" />
        </div>
      </div>

      {/* Card grid skeleton */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-surface-950 p-3 sm:p-5">
        <div className="scanline-overlay opacity-[0.025]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} delay={i * 60} />
          ))}
        </div>
      </div>
    </>
  );
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <div
      className="h-[340px] flex flex-col bg-surface-900 border border-surface-800 overflow-hidden shadow-card [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))] opacity-0 animate-[fadeSlideIn_0.4s_ease_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Thumbnail area */}
      <div className="relative h-36 w-full bg-surface-800 border-b border-surface-800 shrink-0 overflow-hidden">
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-surface-700/40 to-transparent"
          style={{ animationDelay: `${delay}ms` }}
        />
        <div className="absolute top-0 right-0 w-16 h-5 bg-surface-700/50" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-surface-700" />
          <div className="h-2 w-16 bg-surface-800 animate-pulse" style={{ animationDelay: `${delay + 100}ms` }} />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-full bg-surface-800 animate-pulse" style={{ animationDelay: `${delay + 150}ms` }} />
          <div className="h-3 w-3/4 bg-surface-800 animate-pulse" style={{ animationDelay: `${delay + 200}ms` }} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2.5 w-full bg-surface-800/70 animate-pulse" style={{ animationDelay: `${delay + 250}ms` }} />
          <div className="h-2.5 w-5/6 bg-surface-800/70 animate-pulse" style={{ animationDelay: `${delay + 300}ms` }} />
        </div>
        <div className="mt-auto pt-3 border-t border-surface-800 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-2 w-10 bg-surface-800 animate-pulse" style={{ animationDelay: `${delay + 350}ms` }} />
            <div className="h-2.5 w-20 bg-surface-800 animate-pulse" style={{ animationDelay: `${delay + 400}ms` }} />
          </div>
          <div
            className="h-7 w-16 bg-surface-800 animate-pulse [clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%-6px))]"
            style={{ animationDelay: `${delay + 450}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
