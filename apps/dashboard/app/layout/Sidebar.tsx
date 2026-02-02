'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// --- 1. Updated Data Structure with Subroutes ---
const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  {
    name: 'Tutorials',
    href: '#', // Parent doesn't navigate if it has children
    icon: '📚',
    subRoutes: [
      { name: 'Create New', href: '/tutorials/create' },
      { name: 'Published', href: '/tutorials' },
      { name: 'Drafts', href: '/tutorials/drafts' },
    ]
  },
  {
    name: 'Courses',
    href: '#',
    icon: '🎓',
    subRoutes: [
      { name: 'All Courses', href: '/admin/courses' },
      { name: 'Create New', href: '/admin/courses/create' },
    ]
  },
  { name: 'Users_DB', href: '/admin/users', icon: '👥' },
  { name: 'System_Logs', href: '/admin/logs', icon: '⚠️' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  // Track which menus are expanded (by name)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const pathname = usePathname()

  // Optional: Auto-expand menu if current path matches a subroute
  useEffect(() => {
    ADMIN_LINKS.forEach(link => {
      if (link.subRoutes) {
        const hasActiveChild = link.subRoutes.some(sub => pathname === sub.href)
        if (hasActiveChild && !expandedMenus.includes(link.name)) {
          setExpandedMenus(prev => [...prev, link.name])
        }
      }
    })
  }, [pathname])

  const toggleSubMenu = (name: string) => {
    // If sidebar is closed, open it when clicking a parent menu
    if (!isSidebarOpen) setSidebarOpen(true)

    setExpandedMenus(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name) // Collapse
        : [...prev, name] // Expand
    )
  }

  return (
    <aside
      className={`
          relative flex-shrink-0 bg-surface-900 border border-surface-800 border-t-2 border-t-teal-glow transition-all duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? 'w-64' : 'w-20'}
        `}
      style={{ boxShadow: '4px 4px 0px var(--surface-800)' }}
    >
      {/* Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 opacity-50" />

      {/* Content Wrapper */}
      <div className="flex flex-col h-full relative z-20">

        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-center border-b border-surface-800 shrink-0">
          <Link href="/" className="text-teal-glow font-digital tracking-widest text-lg hover:text-white transition-colors">
            {isSidebarOpen ? 'ROOT_ADMIN' : '>_'}
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {ADMIN_LINKS.map((link) => {
            const hasSubRoutes = !!link.subRoutes
            const isExpanded = expandedMenus.includes(link.name)

            // Check if parent itself or any child is active
            const isParentActive = pathname === link.href
            const isChildActive = hasSubRoutes && link.subRoutes?.some(sub => pathname === sub.href)
            const isActive = isParentActive || isChildActive

            return (
              <div key={link.name} className="flex flex-col">
                {/* --- Main Menu Item --- */}
                {hasSubRoutes ? (
                  // Button for Parent Items (Toggles Submenu)
                  <button
                    onClick={() => toggleSubMenu(link.name)}
                    className={`
                      flex items-center gap-4 px-3 py-3 rounded-sm transition-all duration-200 border w-full text-left
                      ${isActive
                        ? 'bg-surface-800 border-teal-glow text-teal-glow shadow-[0_0_10px_rgba(45,212,191,0.1)]'
                        : 'border-transparent text-text-secondary hover:text-white hover:bg-surface-800 hover:border-surface-700'
                      }
                    `}
                  >
                    <span className="text-xl shrink-0">{link.icon}</span>

                    {/* Label (Hidden when closed) */}
                    <div className={`flex-1 flex items-center justify-between overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                      <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                        {link.name}
                      </span>
                      {/* Chevron Icon */}
                      <span className={`text-[10px] transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                        ▼
                      </span>
                    </div>
                  </button>
                ) : (
                  // Simple Link for Leaf Items
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-4 px-3 py-3 rounded-sm transition-all duration-200 border border-transparent
                      ${isActive
                        ? 'bg-surface-800 border-teal-glow text-teal-glow shadow-[0_0_10px_rgba(45,212,191,0.1)]'
                        : 'text-text-secondary hover:text-white hover:bg-surface-800 hover:border-surface-700'
                      }
                    `}
                  >
                    <span className="text-xl shrink-0">{link.icon}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                      {link.name}
                    </span>
                  </Link>
                )}

                {/* --- Sub Menu Items --- */}
                {hasSubRoutes && isSidebarOpen && (
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out bg-surface-950/30 border-l border-surface-800 ml-6 mt-1
                    ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    {link.subRoutes?.map((sub) => {
                      const isSubActive = pathname === sub.href
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`
                            block px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors border-l-2
                            ${isSubActive
                              ? 'text-teal-glow border-teal-glow bg-teal-glow/5'
                              : 'text-surface-600 border-transparent hover:text-white hover:border-surface-600'
                            }
                          `}
                        >
                          {isSubActive && <span className="mr-1">{">"}</span>}
                          {sub.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-surface-800 shrink-0">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-text-secondary hover:text-teal-glow transition-colors"
          >
            <span className="text-xs uppercase font-bold">
              {isSidebarOpen ? '[ Collapse_Panel ]' : '[ < ]'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
