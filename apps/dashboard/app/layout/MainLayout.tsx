'use client'

import { Orbitron, JetBrains_Mono } from 'next/font/google'
import Sidebar from './Sidebar'
import { ThemeToggle } from './ThemeToggle' // Adjust path if needed

// Font Configuration
const digitalFont = Orbitron({ subsets: ['latin'], variable: '--font-digital' })
const terminalFont = JetBrains_Mono({ subsets: ['latin'], variable: '--font-terminal' })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`
      ${digitalFont.variable} ${terminalFont.variable}
      h-screen w-full bg-surface-950 flex gap-4 p-4 overflow-hidden font-terminal text-text-primary
    `}>

      {/* --- SIDEBAR (Floating Left) --- */}
      <Sidebar />

      {/* --- RIGHT COLUMN (Header + Main Content) --- */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative">

        {/* 1. ADMIN HEADER (Floating Top) */}
        <header
          className="
            h-16 mb-4 shrink-0
            bg-surface-900 
            border border-surface-800 
            border-b-2 border-b-teal-glow
            relative flex items-center justify-between px-6
          "
          style={{ boxShadow: '4px 4px 0px var(--surface-800)' }}
        >
          {/* Header Scanline Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 opacity-50" />

          {/* Left: Breadcrumbs / Title (Z-20 to sit above scanlines) */}
          <div className="relative z-20 flex items-center gap-2">
            <span className="text-purple-glow font-digital text-sm tracking-wider">SYS_ADMIN</span>
            <span className="text-surface-700">/</span>
            <span className="text-white text-xs font-bold uppercase tracking-widest">Dashboard</span>
          </div>

          {/* Right: Actions (Theme Toggle, User Profile) */}
          <div className="relative z-20 flex items-center gap-6">
            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase">
              <span className="text-text-secondary">Sys_Status:</span>
              <span className="text-emerald-glow animate-pulse">Online</span>
            </div>

            <div className="h-4 w-[1px] bg-surface-700"></div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Simple User Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-950 border border-surface-700">
              <div className="w-2 h-2 bg-teal-glow"></div>
              <span className="text-[10px] font-bold">Admin_01</span>
            </div>
          </div>
        </header>

        {/* 2. MAIN CONTENT AREA (Floating Fill) */}
        <main className="flex-1 overflow-hidden relative">
          <div className="
            h-full w-full 
            bg-surface-900 
            border border-surface-800 
            border-t-2 border-t-purple-glow
            relative 
            overflow-hidden 
            flex flex-col
          "
            style={{ boxShadow: '4px 4px 0px var(--surface-800)' }}
          >
            {/* Scanline Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 opacity-50" />

            {/* Scrollable Inner Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-20">
              {children}
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}
