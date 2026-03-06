import { Handle, NodeProps, Position } from '@xyflow/react';
import { useRouter } from "next/navigation";

interface SimpleTutorialNodeData {
  tutorial: {
    id: string;
    tutorialName: string;
    level?: string;
    description?: string;
    category?: string;
  };
}

export function TutorialNode({ data, selected }: NodeProps<SimpleTutorialNodeData>) {
  const tutorial = data.tutorial;
  const router = useRouter();

  return (
    <div
      className="w-[280px] flex flex-col bg-surface-900 border border-surface-800 relative overflow-hidden cursor-pointer group transition-all duration-200"
      style={{
        boxShadow: selected
          ? "0 0 0 1px var(--teal-glow), 4px 4px 0px var(--surface-700), 0 0 20px rgba(45,212,191,0.15)"
          : "4px 4px 0px var(--surface-800)",
        borderColor: selected ? "var(--teal-glow)" : undefined,
        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
      }}
      onClick={() => router.push(`/tutorials/${tutorial.id}`)}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-200"
        style={{
          background: selected ? "var(--teal-glow)" : "var(--surface-700)",
          boxShadow: selected ? "0 0 8px var(--shadow-teal)" : "none",
        }}
      />

      {/* Hover inset glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.04) 0%, transparent 60%)" }}
      />

      {/* Corner bracket top-right */}
      <div
        className="absolute top-0 right-0 w-4 h-4 border-t border-r pointer-events-none transition-colors duration-200"
        style={{ borderColor: selected ? "var(--teal-glow)" : "var(--surface-700)" }}
      />

      {/* ── Header ── */}
      <div className="px-3 pt-3 pb-2 border-b border-surface-800 flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {/* System tag */}
          <span className="text-[7px] font-terminal text-text-secondary uppercase tracking-[0.3em] opacity-40 leading-none">
            // TUTORIAL_NODE
          </span>
          {/* Title */}
          <h3 className="text-[11px] font-digital font-black text-text-primary uppercase tracking-wide leading-snug line-clamp-2 group-hover:text-teal-glow transition-colors duration-200">
            {tutorial.tutorialName}
          </h3>
        </div>

        {/* Level badge */}
        <span
          className="shrink-0 text-[7px] font-digital font-black px-1.5 py-0.5 border uppercase tracking-wider leading-none mt-1"
          style={{
            color: "var(--teal-glow)",
            borderColor: "rgba(45,212,191,0.3)",
            background: "rgba(45,212,191,0.05)",
            clipPath: "polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
          }}
        >
          {tutorial.level || "CORE"}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="px-3 py-2.5 flex flex-col gap-2 flex-1">
        {/* Description */}
        {tutorial.description && (
          <p className="text-[9px] font-terminal text-text-secondary leading-relaxed line-clamp-2 opacity-70">
            <span className="text-teal-glow/40 mr-1">{">"}</span>
            {tutorial.description}
          </p>
        )}

        {/* Category */}
        <div className="flex items-center gap-1.5 mt-auto">
          <span className="w-1 h-1 bg-purple-glow shrink-0" style={{ boxShadow: "0 0 4px var(--shadow-purple)" }} />
          <span className="text-[8px] font-terminal font-bold text-purple-glow uppercase tracking-[0.2em]">
            {tutorial.category}
          </span>
        </div>
      </div>

      {/* ── Handles ── */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{
          background: "var(--teal-glow)",
          border: "2px solid var(--surface-900)",
          width: 10,
          height: 10,
          boxShadow: "0 0 6px var(--shadow-teal)",
        }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{
          background: "var(--emerald-glow)",
          border: "2px solid var(--surface-900)",
          width: 10,
          height: 10,
          boxShadow: "0 0 6px var(--shadow-emerald)",
        }}
      />
    </div>
  );
}

// import { Handle, NodeProps, Position } from '@xyflow/react';
// import { useRouter } from "next/navigation";
//
// interface SimpleTutorialNodeData {
//   tutorial: {
//     id: string;
//     tutorialName: string;
//     level?: string;
//     description?: string;
//     category?: string
//   };
// }
//
// export function TutorialNode({ data }: NodeProps<SimpleTutorialNodeData>) {
//   const tutorial = data.tutorial;
//   const router = useRouter();
//
//   return (
//     <div
//       className="w-[400px] h-[150px] p-2 flex flex-col justify-between bg-surface-900 border border-surface-800 rounded shadow-sm text-text-primary"
//       style={{ boxShadow: '2px 2px 0px var(--surface-800)' }}
//       onClick={() => {
//         router.push(`/tutorials/${tutorial.id}`);
//       }}
//     >
//       <div>
//         <h3 className="text-xs font-bold uppercase line-clamp-2">{tutorial.tutorialName}</h3>
//         <p className="text-[9px] text-secondary mt-1">
//           Level: {tutorial.level || 'CORE'}
//         </p>
//       </div>
//
//       <p className="text-xs font-medium text-secondary leading-relaxed mb-2 line-clamp-2 italic flex-1">
//         {">"} {tutorial.description}
//       </p>
//
//
//       <div className="mb-2">
//         <span className="inline-block text-[8px] font-bold text-purple-glow bg-purple-glow/10 border border-purple-glow/20 px-1.5 py-0.5 uppercase tracking-wider rounded-none">
//           {tutorial.category}
//         </span>
//       </div>
//
//
//       {/* React Flow Handles */}
//       <Handle type="source" position={Position.Top} id="top" />
//       <Handle type="target" position={Position.Bottom} id="bottom" />
//     </div>
//   );
// }
