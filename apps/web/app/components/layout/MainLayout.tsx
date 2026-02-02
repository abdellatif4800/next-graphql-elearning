import { Navbar } from "./Navbar"
import { Orbitron, JetBrains_Mono } from 'next/font/google';

const digitalFont = Orbitron({
  subsets: ['latin'],
  variable: '--font-digital'
});

const terminalFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-terminal'
});

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`
      ${digitalFont.variable} ${terminalFont.variable}
      /* 1. FIXED: Changed bg-surface-900 to bg-surface-950 for contrast */
      h-screen w-full bg-surface-950 flex flex-col items-center p-4 md:p-6 
      overflow-hidden font-terminal text-gray-300
    `}>

      {/* Navbar Container */}
      <div className="w-full flex justify-center mb-6 shrink-0">
        <Navbar />
      </div>

      {/* The "Floating" Main Section:
        - bg-surface-900: Now sits on top of bg-surface-950
        - Added custom box-shadow using your CSS variables
      */}
      <main className="
        w-full lg:w-[98%] 
        flex-1 
        bg-surface-900 
        border border-surface-800
        border-t-2 border-t-teal-glow
        overflow-hidden
        custom-scrollbar
        relative
      "
        /* 2. FIXED: Replaced black shadow with your surface-700/800 variable for a visible "hard" shadow */
        style={{ boxShadow: '5px 5px 0px var(--surface-700)' }}>

        {/* Subtle scanline overlay effect */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />

        <div className="relative z-20 h-full">
          {children}
        </div>
      </main>

      {/* Footer with Digital Font */}
      <footer className="w-full flex justify-center gap-4 py-2 text-[10px] uppercase tracking-[0.2em] shrink-0 font-digital mt-2">
        <span className="text-gray-600">System_Status:</span>
        <span className="text-emerald-glow animate-pulse">Ready</span>
        <span className="text-gray-600 ml-4">Access_Level:</span>
        <span className="text-purple-glow">Root</span>
      </footer>
    </div>
  )
}
