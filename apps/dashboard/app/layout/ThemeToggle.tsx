"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative overflow-hidden group
        bg-surface-900 border border-surface-800
        text-[10px] font-bold uppercase tracking-widest
        px-4 py-2
        hover:border-purple-glow hover:text-purple-glow transition-all
      "
      style={{ boxShadow: '3px 3px 0px var(--surface-800)' }}
    >
      <span className="relative z-10 flex items-center gap-2">
        [{theme === "dark" ? "LIGHT_MODE" : "DARK_MODE"}]
      </span>
    </button>
  );
}
