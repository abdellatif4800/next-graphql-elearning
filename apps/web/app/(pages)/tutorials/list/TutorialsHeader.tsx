"use client"

import { useState } from "react";

export default function TutorialsHeader({ hasMore, loadMore, tutorialsLength }: any) {



  return (
    < header className="p-3 border-b border-surface-800 shrink-0 bg-surface-900/50 backdrop-blur-sm z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" >
      <h1 className="text-xl font-digital font-black uppercase tracking-[0.1em] text-primary">
        Tutorial Library
      </h1>
      {
        hasMore ? (
          <button
            onClick={loadMore}
            className="
                group relative px-8 py-3 
                bg-surface-950 border border-teal-glow/50 
                text-teal-glow text-xs font-black uppercase tracking-[0.2em] font-digital
                hover:bg-teal-glow hover:text-black 
                transition-all duration-300
                active:scale-95
                shadow-[0_0_10px_rgba(45,212,191,0.1)]
                hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]
              "
          >
            <span className="mr-2 opacity-50 group-hover:opacity-100">[+]</span>
            LOAD_MORE
            <span className="ml-2 opacity-50 group-hover:opacity-100">[+]</span>
          </button>
        ) : (
          <div className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-50">
              // END_OF_DATA //
          </div>
        )
      }


      <div className="flex justify-between items-center mt-2">
        <p className="text-xs font-bold text-secondary uppercase tracking-widest">
          <span className="text-emerald-glow">{tutorialsLength}</span> Tutorials Found
        </p>
      </div>
    </header >
  )
}

