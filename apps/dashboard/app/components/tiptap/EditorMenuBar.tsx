export const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  // 1. Image Insertion Logic
  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  // Helper to define button classes based on active state
  const getBtnClass = (isActive: boolean) => {
    const base = "px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all duration-200 "
    const active = "bg-teal-glow text-surface-950 border-teal-glow shadow-[2px_2px_0px_var(--surface-700)]"
    const inactive = "bg-transparent border-surface-700 text-text-secondary hover:border-teal-glow hover:text-teal-glow hover:shadow-[2px_2px_0px_var(--surface-800)]"
    return base + (isActive ? active : inactive)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-surface-900  sticky top-0 z-10">
      <div className="flex gap-2 border-r border-surface-800 pr-2 mr-2">
        <span className="text-[10px] text-surface-700 self-center font-digital opacity-50 select-none">FMT_</span>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={getBtnClass(editor.isActive('bold'))}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getBtnClass(editor.isActive('italic'))}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={getBtnClass(editor.isActive('strike'))}>Strike</button>
      </div>

      <div className="flex gap-2 border-r border-surface-800 pr-2 mr-2">
        <span className="text-[10px] text-surface-200 self-center font-digital opacity-80 select-none">BLK_</span>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={getBtnClass(editor.isActive('heading', { level: 1 }))}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={getBtnClass(editor.isActive('heading', { level: 2 }))}>H2</button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={getBtnClass(editor.isActive('codeBlock'))}>Code_Block</button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={getBtnClass(editor.isActive('bulletList'))}>List</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={getBtnClass(false)}>---</button>

        {/* 2. New Image Button */}
        <button onClick={addImage} className={getBtnClass(editor.isActive('image'))}>IMG</button>
      </div>
    </div>
  )
}
