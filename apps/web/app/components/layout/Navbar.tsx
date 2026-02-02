"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full lg:w-[70%] flex flex-row items-center justify-between font-digital tracking-widest">

      {/* Logo Section */}
      <Link href="/" className="group">
        <h1 className="text-xl font-black uppercase flex items-center">
          <span className="text-teal-glow group-hover:text-emerald-glow transition-colors">
            {">"} ./
          </span>
          {/* FIXED: Use text-text-primary */}
          <span className="text-text-primary ml-2 group-hover:text-teal-glow transition-colors">
            Root_LMS
          </span>
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-10">
        {["Tutorials", "Courses", "Community"].map((item) => {
          const href = `/${item.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item}
              href={href}
              className={`
                text-xs font-bold uppercase transition-all relative
                ${isActive
                  ? "text-purple-glow drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  : "text-text-secondary hover:text-text-primary" /* FIXED: Use text-text-secondary */
                }
              `}
            >
              {isActive && <span className="mr-1 animate-pulse">_</span>}
              {item}
              {isActive && (
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-glow shadow-[0_0_5px_rgba(168,85,247,0.5)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-row items-center gap-4">

        {/* 1. Theme Toggle */}
        <ThemeToggle />

        {/* 2. Login Button */}
        <button
          type="button"
          className="bg-emerald-glow text-surface-950 text-[10px] font-black uppercase px-6 py-2 hover:bg-white hover:text-black transition-all active:translate-y-[2px] active:translate-x-[2px]"
          style={{ boxShadow: '4px 4px 0px rgba(16, 185, 129, 0.3)' }}
        >
          _INIT_LOGIN
        </button>
      </div>
    </nav>
  );
};
