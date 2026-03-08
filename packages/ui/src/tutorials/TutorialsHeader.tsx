"use client";

export function TutorialsHeader({ hasMore, loadMore, tutorialsLength, onOpenFilter }: any) {
  return (
    <header className="
      shrink-0 z-10
      bg-surface-900 backdrop-blur-sm
      border-b border-surface-800
      px-3 sm:px-6 py-3 sm:py-4
      flex flex-row items-center justify-between gap-2 sm:gap-6
      custom-shadow
    ">

      {/* Left — filter toggle + Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">

        {/* Filter toggle button — always shown, opens overlay */}
        <button
          onClick={onOpenFilter}
          className="shrink-0 border border-surface-700 bg-surface-900 text-text-secondary hover:text-purple-glow hover:border-purple-glow transition-colors duration-200 p-2"
          aria-label="Open filters"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
        </button>

        {/* Accent bar */}
        <span className="hidden sm:block w-1 h-8 bg-teal-glow shadow-glow-teal shrink-0" />

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="hidden sm:block text-[9px] font-terminal tracking-[0.3em] text-text-secondary uppercase opacity-60">
            // SYS://ROOT_LMS
          </span>
          <h1 className="text-sm sm:text-lg font-digital font-black uppercase tracking-[0.1em] text-text-primary text-glow-teal leading-none truncate">
            Tutorial_Library
          </h1>
        </div>
      </div>

      {/* Right — Count + Action */}
      <div className="flex items-center gap-2 sm:gap-6 shrink-0">

        {/* Count badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 border border-surface-700 px-2 sm:px-3 py-1 sm:py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow shadow-glow-emerald-sm animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-terminal uppercase tracking-[0.2em] text-text-secondary">
            <span className="text-emerald-glow font-bold text-xs sm:text-sm">{tutorialsLength}</span>
            <span className="ml-1 opacity-60 hidden sm:inline">records</span>
          </span>
        </div>

        {/* Divider — desktop only */}
        <span className="hidden sm:block h-8 w-px bg-surface-700" />

        {/* Load more / end of data */}
        {hasMore ? (
          <button
            onClick={loadMore}
            className="
              group relative overflow-hidden
              px-3 sm:px-6 py-1.5 sm:py-2
              bg-surface-950 border border-teal-glow/40
              text-teal-glow text-[9px] sm:text-[10px] font-digital font-black uppercase tracking-[0.2em]
              hover:bg-teal-glow hover:text-black
              transition-all duration-200 active:scale-95
              [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]
            "
          >
            <span className="absolute inset-0 bg-teal-glow -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0" />
            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
              <span className="opacity-50 group-hover:opacity-100 transition-opacity">[+]</span>
              <span className="hidden sm:inline">LOAD_MORE</span>
              <span className="sm:hidden">MORE</span>
              <span className="hidden sm:inline opacity-50 group-hover:opacity-100 transition-opacity">[+]</span>
            </span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-terminal uppercase tracking-[0.25em] text-text-secondary opacity-40">
            <span className="w-1 h-1 bg-text-secondary" />
            END_OF_DATA
            <span className="w-1 h-1 bg-text-secondary" />
          </div>
        )}
      </div>
    </header>
  );
}
