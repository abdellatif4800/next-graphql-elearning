"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle"; // Adjust path if necessary

// --- Sub-Component: User Dropdown (Logged In State) ---
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1.5 border transition-all duration-200
          text-[10px] font-bold uppercase tracking-wider
          ${isOpen
            ? "border-teal-glow text-teal-glow bg-surface-900 shadow-[0_0_10px_rgba(45,212,191,0.2)]"
            : "border-surface-700 text-secondary hover:text-white hover:border-surface-600"
          }
        `}
      >
        <div className="w-2 h-2 bg-emerald-glow animate-pulse" /> {/* Online Status Dot */}
        <span>User_01</span>
        <span className="text-[8px] opacity-60 ml-1">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 bg-surface-900 border border-surface-700 z-50 flex flex-col shadow-xl"
          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
        >
          {/* Menu Header */}
          <div className="px-4 py-2 border-b border-surface-800 bg-surface-950/50">
            <span className="text-[9px] text-teal-glow font-digital opacity-80">ACCESS_LEVEL: ADMIN</span>
          </div>

          {/* Menu Items */}
          <Link href="/profile" className="px-4 py-3 text-xs text-secondary hover:bg-surface-800 hover:text-white transition-colors border-l-2 border-transparent hover:border-purple-glow text-left flex items-center group">
            <span className="opacity-0 group-hover:opacity-100 mr-2 text-purple-glow">{">"}</span>
            Profile_Config
          </Link>
          <Link href="/settings" className="px-4 py-3 text-xs text-secondary hover:bg-surface-800 hover:text-white transition-colors border-l-2 border-transparent hover:border-purple-glow text-left flex items-center group">
            <span className="opacity-0 group-hover:opacity-100 mr-2 text-purple-glow">{">"}</span>
            System_Settings
          </Link>

          <div className="border-t border-surface-800 my-1"></div>

          <button
            onClick={() => console.log("Logout")}
            className="px-4 py-3 text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors border-l-2 border-transparent hover:border-red-500 text-left flex items-center group w-full"
          >
            <span className="opacity-0 group-hover:opacity-100 mr-2 text-red-500">{">"}</span>
            Terminate_Session
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Navbar Component ---
export const Navbar = () => {
  const pathname = usePathname();

  // MOCK STATE: Change this to true/false to see both states
  const isLoggedIn = true;

  return (
    <nav className="w-full lg:w-[85%] max-w-7xl mx-auto flex flex-row items-center justify-between font-digital tracking-widest py-3 px-4">

      {/* 1. Logo Section */}
      <Link href="/" className="group flex items-center gap-2">
        <div className="h-6 w-1 bg-teal-glow group-hover:bg-emerald-glow transition-colors shadow-[0_0_8px_var(--teal-glow)]" />
        <h1 className="text-lg font-black uppercase flex items-center">
          <span className="text-primary group-hover:text-white transition-colors">
            Root_LMS
          </span>
          <span className="text-teal-glow ml-1 text-xs animate-pulse">_</span>
        </h1>
      </Link>

      {/* 2. Navigation Links (Slim & Centered) */}
      <div className="hidden md:flex items-center gap-8 border-x border-surface-800 px-8 h-6">
        {["Tutorials", "Courses", "Community"].map((item) => {
          const href = `/${item.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item}
              href={href}
              className={`
                text-[11px] font-bold uppercase transition-all flex items-center
                ${isActive
                  ? "text-purple-glow drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]"
                  : "text-secondary hover:text-white"
                }
              `}
            >
              {isActive && <span className="mr-1.5 text-purple-glow">{">"}</span>}
              {item}
            </Link>
          );
        })}
      </div>

      {/* 3. Action Section (Theme & User) */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle (Assuming it's an icon button) */}
        <div className="opacity-80 hover:opacity-100 transition-opacity">
          <ThemeToggle />
        </div>

        {/* Separator */}
        <div className="h-4 w-[1px] bg-surface-800 hidden sm:block" />

        {/* User Auth State */}
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <button
            type="button"
            className="bg-emerald-glow text-surface-950 text-[10px] font-black uppercase px-5 py-1.5 hover:bg-white hover:text-black transition-all active:translate-y-[1px]"
            style={{ boxShadow: '3px 3px 0px rgba(16, 185, 129, 0.2)' }}
          >
            _INIT_LOGIN
          </button>
        )}
      </div>
    </nav>
  );
};
