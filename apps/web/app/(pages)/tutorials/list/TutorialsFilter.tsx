'use client'

import { useState } from "react"

export default function TutorialsFilter({ loadFilterdData }: any) {
  const [tutorialName, setTutorialName] = useState('')
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  const handleLevelsChange = (level: string) => {
    setLevels((prev) =>
      prev.includes(level)
        ? prev.filter((c) => c !== level)
        : [...prev, level]
    );


  };


  const handleCategoryChange = (topic: string) => {
    setCategories((prev) =>
      prev.includes(topic)
        ? prev.filter((c) => c !== topic)
        : [...prev, topic]
    );


  };

  return (
    <aside className="hidden lg:flex w-64 lg:w-80 border border-surface-800 bg-surface-900 shrink-0 flex-col transition-colors duration-300 shadow-[4px_4px_0px_var(--surface-800)]">

      {/* Header Section */}
      <header className="p-6 border-b border-surface-800 flex flex-col gap-4">
        <h2 className="text-sm font-digital font-bold text-purple-glow tracking-widest uppercase">
          System_Filters
        </h2>

        {/* --- NEW: Action Buttons --- */}
        <div className="flex gap-2 w-full">
          {/* Apply Button */}
          <button
            type="button"
            className="flex-1 bg-teal-glow text-surface-950 border border-teal-glow py-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.2)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none"

            onClick={() => loadFilterdData({
              tutorialName: tutorialName,
              categories: categories,
              levels: levels
            })}
          >

            [ Apply ]
          </button>

          {/* Reset Button */}
          <button
            type="button"
            className="flex-1 bg-transparent text-red-500 border border-red-500/50 py-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-red-500 hover:text-surface-950 hover:border-red-500 transition-all active:translate-y-[1px] active:translate-x-[1px]"
            onClick={() => {
              loadFilterdData({})
              setTutorialName('')
              setCategories([])
              setLevels([])
            }}
          >
            [ Reset ]
          </button>
        </div>
      </header>

      <div className="p-6 flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar">

        {/* 1. Search (tutorialName) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary uppercase">Query_Protocol</label>
          <div className="border border-surface-700 p-3 bg-surface-950 text-xs font-bold text-teal-glow flex items-center gap-2 group focus-within:border-teal-glow transition-colors">
            <span>{'>'}</span>
            <input
              type="text"
              placeholder="Search_Modules..."
              value={tutorialName}
              onChange={(e) => setTutorialName(e.target.value)}
              className="bg-transparent border-none outline-none w-full placeholder-surface-700 text-teal-glow font-mono text-xs p-0 focus:ring-0"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* 2. Categories (category) */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-secondary uppercase">Sector_Category</label>
          <div className="space-y-1">
            {['Frontend', 'Backend', 'DevOps', 'Systems', 'Security'].map((topic) => (
              <label
                key={topic}
                className="flex items-center gap-3 text-xs font-bold text-secondary hover:text-white transition-colors cursor-pointer group p-1"
              >
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer appearance-none w-3 h-3 border border-surface-600 bg-surface-950 checked:bg-teal-glow checked:border-teal-glow rounded-none"
                    checked={categories.includes(topic)}
                    onChange={() => handleCategoryChange(topic)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none text-black text-[8px]">✓</div>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">{topic}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. Level (level) */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-secondary uppercase">Access_Level</label>
          <div className="space-y-1">
            {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((lvl) => (
              <label
                key={lvl}
                className="flex items-center gap-3 text-xs font-bold text-secondary hover:text-white transition-colors cursor-pointer group p-1"
              >
                <input
                  type="checkbox"
                  name="level"
                  checked={levels.includes(lvl)}
                  onChange={() => handleLevelsChange(lvl)}
                  className="appearance-none w-3 h-3 rounded-full border border-surface-600 bg-surface-950 checked:bg-purple-glow checked:border-purple-glow"
                />
                <span className="group-hover:translate-x-1 transition-transform">{lvl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Date Filters (createdAfter/Before) */}
        <div className="space-y-3 pt-4 border-t border-surface-800">
          <label className="text-xs font-bold text-secondary uppercase">Timeline_Range</label>
          <div className="flex flex-col gap-2">
            <input type="date" className="bg-surface-950 border border-surface-700 text-secondary text-[10px] uppercase p-2 focus:border-teal-glow focus:outline-none" />
            <input type="date" className="bg-surface-950 border border-surface-700 text-secondary text-[10px] uppercase p-2 focus:border-teal-glow focus:outline-none" />
          </div>
        </div>

      </div>
    </aside>
  )
}
