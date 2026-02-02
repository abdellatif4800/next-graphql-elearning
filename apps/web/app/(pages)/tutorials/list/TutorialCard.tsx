import Link from "next/link";

export default function TutorialCard({ tutorial }: { tutorial: any }) {

  // --- Data Normalization ---
  const displayData = {
    id: tutorial.id,
    title: tutorial.tutorialName || "UNTITLED_MODULE",
    description: tutorial.description || (
      tutorial.units?.length
        ? `Contains ${tutorial.units.length} learning unit(s) ready for access. Contains ${tutorial.units.length} learning unit(s) ready for access. Contains ${tutorial.units.length} learning unit(s) ready for access. Contains ${tutorial.units.length} learning unit(s) ready for access. Contains ${tutorial.units.length} learning unit(s) ready for access.`
        : "No units initialized in this sector."
    ),
    thumbnail: tutorial.thumbnail || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
    level: tutorial.level || "CORE_SYSTEM",
    category: tutorial.category || "General_Sector",
    instructorName: tutorial.instructor?.name || "ROOT_ADMIN"
  };

  return (
    <div
      className="h-[340px] flex flex-col bg-surface-900 border border-surface-800 hover:border-teal-glow transition-all duration-300 group relative overflow-hidden"
      style={{ boxShadow: '4px 4px 0px var(--surface-800)' }}
    >
      {/* Thumbnail Section */}
      <div className="relative h-35 w-full bg-black overflow-hidden border-b border-surface-800 shrink-0">
        <img
          src={displayData.thumbnail}
          alt={displayData.title}
          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
        />

        {/* Level Badge (Still Absolute Top Right) */}
        <div className="absolute top-0 right-0 p-2 z-10">
          <span className="bg-surface-950/90 backdrop-blur-sm text-teal-glow border border-teal-glow/30 text-[9px] font-black px-2 py-0.5 uppercase font-digital shadow-sm">
            {displayData.level}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 h-full overflow-hidden">

        {/* --- NEW: Category Badge (Placed Above Title) --- */}
        <div className="mb-2">
          <span className="inline-block text-[8px] font-bold text-purple-glow bg-purple-glow/10 border border-purple-glow/20 px-1.5 py-0.5 uppercase tracking-wider rounded-none">
            {displayData.category}
          </span>
        </div>

        <h2 className="text-sm font-digital font-black text-primary uppercase tracking-wider mb-2 line-clamp-2 group-hover:text-teal-glow transition-colors shrink-0">
          {displayData.title}
        </h2>

        <p className="text-xs font-medium text-secondary leading-relaxed mb-2 line-clamp-2 italic flex-1">
          {">"} {displayData.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-surface-800 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-secondary uppercase">Instructor</span>
            <span className="text-[10px] font-black text-purple-glow truncate w-24">
              {displayData.instructorName}
            </span>
          </div>

          <Link
            href={`/tutorials/${displayData.id}`}
            className="bg-emerald-glow text-black px-4 py-1.5 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            Read Now
          </Link>
        </div>
      </div>
    </div>
  );
}
