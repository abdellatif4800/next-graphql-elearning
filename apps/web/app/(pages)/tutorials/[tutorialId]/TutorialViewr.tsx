'use client'

import { useQuery } from '@apollo/client/react';
import { GET_TUTORIAL } from '@repo/gql';
import Link from 'next/link';
import { TipTapLeasonViewer } from '@repo/ui';
import { useEffect, useState } from 'react';

export default function TutorialViewer({ tutorialId }: { tutorialId: string }) {
  const { data, loading, error } = useQuery(GET_TUTORIAL, {
    variables: { ID: tutorialId },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network"
  });

  const [currentUnit, setCurrentUnit] = useState<any>(null);

  // Helper to get title by index
  const getUnitTitle = (index: number, tutorialData: any = null) => {
    const source = tutorialData || data?.tutorialById;
    return source?.unitsTitlesList?.[index] || `Unit_${index + 1}`;
  };

  useEffect(() => {
    if (data?.tutorialById?.units) {
      const units = data.tutorialById.units;

      // 1. Find the default unit (Order 1 or first in list)
      const defaultIndex = units.findIndex((u: any) => u.order === 1);
      const validIndex = defaultIndex !== -1 ? defaultIndex : 0;
      const unit = units[validIndex];

      // 2. Attach the title manually since it lives in a separate array
      setCurrentUnit({
        ...unit,
        unitTitle: getUnitTitle(validIndex, data.tutorialById)
      });
    }
  }, [data]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="h-full w-full bg-surface-950 flex flex-col items-center justify-center font-terminal text-teal-glow p-4">
        <div className="text-xl font-bold animate-pulse">ACCESSING_MAINFRAME...</div>
        <div className="text-xs text-secondary mt-2"> decrypting_course_data [////////////////////]</div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="h-full w-full bg-surface-950 flex flex-col items-center justify-center font-terminal text-red-500 p-4">
        <div className="text-xl font-bold">DATA_CORRUPTION_DETECTED</div>
        <div className="text-xs mt-2 border border-red-900 p-2 bg-red-950/20">Error: {error.message}</div>
      </div>
    );
  }

  const tutorial = data?.tutorialById;
  if (!tutorial) return <div className="p-10 text-secondary font-terminal">NO_DATA_FOUND</div>;

  return (
    <div className="h-full w-full bg-surface-950 p-6 flex gap-6 overflow-hidden font-terminal text-primary min-h-0">

      {/* --- SIDEBAR --- */}
      <aside className="w-96 shrink-0 flex flex-col bg-surface-900 border border-surface-800 shadow-xl h-full max-h-full overflow-hidden">

        {/* Sidebar Header */}
        <div className="p-5 border-b border-surface-800 bg-surface-900/50 backdrop-blur shrink-0">
          <Link href="/tutorials" className="text-[10px] font-bold text-secondary hover:text-teal-glow uppercase tracking-wider mb-2 block transition-colors">
            {"<"} Return_To_Base
          </Link>
          <h1 className="text-md font-digital font-black text-white uppercase leading-tight">
            {tutorial.tutorialName}
          </h1>
        </div>

        {/* Sidebar List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 min-h-0">
          <div className="space-y-4 px-2 pb-4">
            <div className="group">
              <div className="ml-1 pl-3 border-l border-surface-700 space-y-0.5">
                {tutorial.units?.map((unit: any, index: number) => {
                  const title = getUnitTitle(index);
                  // Highlight active unit
                  const isActive = currentUnit?.id === unit.id;

                  return (
                    <div
                      key={unit.id}
                      // ADDED: onClick to switch units
                      onClick={() => setCurrentUnit({ ...unit, unitTitle: title })}
                      className={`
                        flex items-center gap-2 py-1.5 px-2 text-[11px] cursor-pointer rounded-sm transition-colors
                        ${isActive ? 'bg-surface-800 text-teal-glow border-r-2 border-teal-glow' : 'text-secondary hover:bg-surface-800 hover:text-white'}
                      `}
                    >
                      <span className="opacity-60">./</span>
                      <span className="truncate flex-1">{title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-surface-800 bg-surface-950/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-surface-800 border border-surface-700 flex items-center justify-center text-sm rounded-none">👾</div>
            <div className="overflow-hidden">
              <div className="text-[9px] text-secondary uppercase font-bold">Instructor</div>
              <div className="text-xs font-bold text-primary truncate">ROOT_ADMIN</div>
            </div>
            <div className="ml-auto text-[9px] text-purple-glow font-mono opacity-60">
              {tutorial.units?.length || 0}_Files
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col bg-surface-900 border border-surface-800 shadow-xl h-full relative overflow-hidden overflow-y-auto custom-scrollbar p-4 lg:p-4 min-h-0">

        {currentUnit ? (
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 pb-20">
            <div className="mb-10">

              <h3 className="text-xl font-digital font-bold text-white mb-4 border-l-4 border-purple-glow pl-4">
                {currentUnit.unitTitle}
              </h3>

              <div className="mb-6">
                {currentUnit.content ? (
                  <TipTapLeasonViewer content={currentUnit.content} />
                ) : (
                  <div className="p-4 border border-dashed border-surface-700 text-secondary text-sm">
                    <span className="text-teal-glow font-bold mr-2">[EMPTY]</span>
                    Data stream is void.
                  </div>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* Optional: Loading state for the right panel specifically */
          <div className="h-full flex items-center justify-center text-secondary text-xs animate-pulse">
            LOADING_UNIT_DATA...
          </div>
        )}

      </main>

    </div>
  )
}
