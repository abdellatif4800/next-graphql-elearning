'use client'

import { AdminEditor } from "@/app/components/tiptap/AdminEditor"
import { CreateUnitsContainer } from "@/app/components/tutorials/CreateUnitsContainer"
import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_TUTORIAL } from "@repo/gql"


// --- STYLED INPUT COMPONENT ---
const InputField = ({ name, placeholder, value, onChange }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase font-bold text-teal-glow tracking-wider pl-1">{placeholder}</label>
    <input
      type="text"
      name={name}
      placeholder={`ENTER_${placeholder.toUpperCase()}...`}
      value={value}
      onChange={onChange}
      className="
          bg-surface-950 border border-surface-700 text-text-primary text-xs font-mono p-2.5
          focus:outline-none focus:border-purple-glow focus:ring-1 focus:ring-purple-glow/50
          placeholder:text-surface-700 transition-all duration-300
        "
    />
  </div>
)



export default function CreateTutorialPage() {
  const [saveTutorial, { loading, error }] = useMutation(CREATE_TUTORIAL);

  const [tutorialDetailes, setTutorialDetails] = useState<{
    tutorialName: string
    author: string
    category: string
    description?: string
    level?: string
    thumbnail?: string
  }>({
    tutorialName: "",
    author: "",
    category: "",
    description: "",
    level: "",
    thumbnail: "",
  })

  const [units, setUnits] = useState<{
    unitTitle: string, order: number, content: string
  }[]>([])

  const [activeUnit, setActiveUnit] = useState<{
    unitTitle: string,
    order: number,
    content: string
  } | null>(units[0] || null)

  const handleAddUnit = (newUnit: {
    unitTitle: string,
    order: number,
    content: string
  }) => {
    setUnits(prev => [...prev, newUnit])
    setActiveUnit(newUnit)
  }

  const handleEditUnit = (unit: any) => {
    setActiveUnit(unit)
  }

  const handleContentChange = (html: string) => {
    if (!activeUnit) return
    setUnits(prev => prev.map(u =>
      u.order === activeUnit.order ? { ...u, content: html } : u
    ))
  }

  const handleTutorialDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTutorialDetails(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveTutorial = async () => {
    const tutorialData = {
      authorId: tutorialDetailes.author,
      category: tutorialDetailes.category,
      description: tutorialDetailes.description,
      level: tutorialDetailes.level,
      thumbnail: tutorialDetailes.thumbnail,
      tutorialName: tutorialDetailes.tutorialName,
      units: units.map(u => ({
        unitTitle: u.unitTitle,
        order: u.order,
        content: u.content,
      })),
    }
    console.log(tutorialData);

    // await saveTutorial({
    //   variables: {
    //     tutorialData
    //   }
    // })
  }


  return (
    <div className='h-full flex flex-col gap-6 p-4 overflow-hidden'>

      {/* 1. Header & Metadata Section */}
      <div className="bg-surface-900 border border-surface-800 p-5 shadow-[4px_4px_0px_var(--surface-800)] relative shrink-0">
        <div className="absolute top-0 right-0 bg-surface-800 text-[9px] text-text-secondary px-2 py-0.5 font-mono">META_DATA_CONFIG</div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <InputField name="tutorialName" placeholder="Title" value={tutorialDetailes.tutorialName}
            onChange={handleTutorialDetailsChange}
          />
          <InputField name="category" placeholder="Category" value={tutorialDetailes.category}
            onChange={handleTutorialDetailsChange}
          />
          <InputField name="author" placeholder="Author_ID" value={tutorialDetailes.author}
            onChange={handleTutorialDetailsChange}
          />

          <button
            onClick={handleSaveTutorial}
            disabled={loading}
            className="
              h-[42px] bg-teal-glow text-black font-black uppercase tracking-widest text-xs px-6
              hover:bg-white transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none
              shadow-[4px_4px_0px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? 'SAVING...' : 'SAVE_TUTORIAL'}
          </button>
        </div>
      </div>

      {/* 2. Main Workspace (Split View) */}
      <div className="flex flex-1 gap-6 min-h-0">

        {/* Left Panel: Unit Manager */}
        <div className="w-1/4 min-w-[250px] flex flex-col bg-surface-900 border border-surface-800 shadow-[4px_4px_0px_var(--surface-800)] relative overflow-hidden">
          <div className="p-3 border-b border-surface-800 bg-surface-950/30">
            <h3 className="font-digital text-purple-glow text-sm tracking-wider">UNIT_SEQUENCE</h3>
          </div>
          <CreateUnitsContainer
            units={units}
            currentUnit={activeUnit}
            onAddUnit={handleAddUnit}
            onSelectUnit={handleEditUnit}
          />
        </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 bg-surface-900 border border-surface-800 shadow-[4px_4px_0px_var(--surface-800)] relative overflow-hidden flex flex-col">
          <div className="p-3 border-b border-surface-800 bg-surface-950/30 flex justify-between items-center">
            <h3 className="font-digital text-teal-glow text-sm tracking-wider">CONTENT_EDITOR</h3>
            <span className="text-[9px] font-mono text-text-secondary">{activeUnit ? `EDITING_ID: ${activeUnit.order}` : 'IDLE'}</span>
          </div>
          <div className="flex-1 overflow-hidden relative ">
            <AdminEditor
              unit={activeUnit}
              onEditContent={handleContentChange}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
