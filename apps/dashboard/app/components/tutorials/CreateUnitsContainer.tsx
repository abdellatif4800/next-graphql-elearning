'use client'

import { useMemo, useState } from "react"

export function CreateUnitsContainer({ units, currentUnit, onAddUnit, onSelectUnit }: any) {

  const [newUnitTitle, setNewUnitTitle] = useState<string>('')
  const [newUnitOrder, setNewUnitOrder] = useState<number | "">("")

  const handleNewUnit = () => {
    if (!newUnitTitle || newUnitOrder === "") return
    const newUnit = { unitTitle: newUnitTitle, order: Number(newUnitOrder), content: "" }
    onAddUnit(newUnit)
    setNewUnitOrder('')
    setNewUnitTitle('')
  }

  const sortedUnits = useMemo(() => [...units].sort((a, b) => a.order - b.order), [units])

  return (
    <div className="flex flex-col h-full">

      {/* Scrollable Unit List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {sortedUnits.length === 0 && (
          <div className="text-center py-8 text-[10px] text-surface-700 font-mono italic">
            NO_UNITS_INITIALIZED...
          </div>
        )}

        {sortedUnits.map((unit) => {
          const isActive = currentUnit?.order === unit.order;
          return (
            <div
              key={unit.order}
              onClick={() => onSelectUnit(unit)}
              className={`
                cursor-pointer p-3 border transition-all duration-200 relative group
                ${isActive
                  ? "bg-surface-800 border-teal-glow shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                  : "bg-surface-950 border-surface-700 hover:border-purple-glow hover:bg-surface-900"
                }
              `}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-teal-glow' : 'text-text-secondary group-hover:text-purple-glow'}`}>
                  UNIT_{unit.order.toString().padStart(2, '0')}
                </span>
                {isActive && <span className="w-1.5 h-1.5 bg-teal-glow animate-pulse"></span>}
              </div>
              <div className={`font-mono text-xs truncate ${isActive ? 'text-white' : 'text-text-primary'}`}>
                {unit.unitTitle}
              </div>
            </div>
          )
        })}
      </div>

      {/* New Unit Form (Bottom Docked) */}
      <div className="p-3 border-t-2 border-surface-800 bg-surface-950/50 shrink-0">
        <div className="text-[9px] font-bold text-teal-glow mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-glow"></span>
          Initialize_New_Unit
        </div>

        <div className="space-y-2">
          <input
            className="w-full bg-surface-900 border border-surface-700 text-xs p-2 text-white placeholder-surface-600 focus:border-teal-glow focus:outline-none font-mono"
            type="text"
            placeholder="TITLE_STRING"
            value={newUnitTitle}
            onChange={(e) => setNewUnitTitle(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="w-20 bg-surface-900 border border-surface-700 text-xs p-2 text-white placeholder-surface-600 focus:border-teal-glow focus:outline-none font-mono"
              type="number"
              placeholder="IDX"
              value={newUnitOrder}
              onChange={(e) => setNewUnitOrder(Number(e.target.value))}
            />
            <button
              onClick={handleNewUnit}
              className="flex-1 bg-surface-800 border border-surface-700 text-teal-glow hover:bg-teal-glow hover:text-black hover:border-teal-glow transition-all text-xs font-bold uppercase tracking-wider"
            >
              ADD_UNIT [+]
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
