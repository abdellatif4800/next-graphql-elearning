'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import CodeBlock from '@tiptap/extension-code-block'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import { MenuBar } from "./EditorMenuBar"

// --- EDITOR STYLES CONSTANT ---
const editorClass =
  // Layout & Sizing
  "prose prose-invert max-w-none " +
  "w-full h-full min-h-full " + // Force full width/height
  "p-6 " +
  "flex flex-col items-start justify-start " + // Force content to start at top-left
  "bg-transparent " +

  // Text & Font
  "focus:outline-none " +
  "font-terminal text-text-secondary " +

  // Customization
  "custom-scrollbar " +
  "selection:bg-teal-glow selection:text-black " +

  // IMPORTANT: Target the actual editable area of Tiptap
  "[&_.ProseMirror]:min-h-full [&_.ProseMirror]:w-full [&_.ProseMirror]:outline-none " +

  // Elements Styling
  "[&_pre]:bg-surface-950 [&_pre]:border [&_pre]:border-surface-700 [&_pre]:rounded-sm [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-emerald-glow [&_pre]:my-4 [&_pre]:shadow-inner " +
  "[&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-4 [&_ul]:space-y-1 [&_ul]:text-text-secondary " +
  "[&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-4 [&_ol]:space-y-1 [&_ol]:text-text-secondary " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-purple-glow [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-purple-glow [&_blockquote]:bg-surface-950/50 " +
  "[&_hr]:border-t [&_hr]:border-surface-700 [&_hr]:my-6 " +
  "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-sm [&_img]:border [&_img]:border-surface-700 [&_img]:my-4";

export function AdminEditor({ unit, onEditContent }: { unit: any, onEditContent: (html: string) => void }) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
        bulletList: {},
        orderedList: {},
        blockquote: {},
        horizontalRule: {},
      }),
      CodeBlock,
      Underline,
      Image,
    ],
    editorProps: {
      attributes: {
        class: editorClass,
      },
    },
    immediatelyRender: false,
    content: unit?.content ?? '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onEditContent(html)
    },
  })

  useEffect(() => {
    if (editor && unit) {
      const currentContent = editor.getHTML();
      // Only update if content is drastically different to prevent loop/cursor jump
      if (currentContent !== unit.content) {
        editor.commands.setContent(unit.content)
      }
    }
  }, [unit?.order, editor])

  if (!editor) return null

  return (
    <div className="flex flex-col h-full bg-surface-900 relative border border-green-500">
      {unit ? (
        <>
          {/* Toolbar Area */}
          <div className="p-2 border-b border-surface-800 bg-surface-950/50 sticky top-0 z-30">
            <MenuBar editor={editor} />
          </div>

          {/* Editor Area */}
          {/* Removed any flex centering classes from here */}
          <div className="border h-full overflow-y-scroll  custom-scrollbar 1relative bg-surface-900">
            {/* Scanline Overlay */}
            {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] z-10 opacity-50 sticky top-0 h-full border border-red-500" /> */}

            {/* The EditorContent component needs to fill the height */}
            <EditorContent editor={editor} className="h-full relative z-20" />
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-surface-700 space-y-4">
          <div className="w-16 h-16 border-2 border-dashed border-surface-700 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-2xl">?</span>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest">
            Awaiting_Selection...
          </div>
        </div>
      )}
    </div>
  )
}
