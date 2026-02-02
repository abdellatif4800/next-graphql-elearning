"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "WELCOME_TO_ROOT_LMS...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    /* Global Container: Added font-medium to make EVERYTHING slightly bolder */
    <div className="h-full w-full bg-surface-950 p-6 font-terminal text-primary font-medium flex flex-col overflow-hidden">

      {/* 1. HEADER (Top Bar) */}
      <header className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <div className="text-xs font-bold text-teal-glow uppercase tracking-widest mb-1 animate-pulse">
            ● Status :: Online
          </div>
          {/* Increased size and weight */}
          <h1 className="text-4xl font-digital font-black uppercase tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            Root_Dashboard
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold text-secondary font-mono">
            {">"} {text}<span className="animate-pulse">_</span>
          </p>
        </div>
      </header>

      {/* 2. MAIN HORIZONTAL LAYOUT */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 overflow-hidden">

        {/* PANEL A: HERO & CTA (Width: 40%) */}
        <section className="flex-[2] flex flex-col gap-6 h-full min-h-0">
          <div className="flex-1 bg-surface-900 border border-surface-800 p-8 flex flex-col justify-center relative overflow-hidden group hover:border-teal-glow transition-colors">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <div className="text-9xl font-digital text-teal-glow">01</div>
            </div>

            {/* Bigger, Bolder Headline */}
            <h2 className="text-5xl md:text-7xl font-digital font-black uppercase text-primary mb-6 relative z-10">
              Start <br /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-glow to-purple-glow">Journey</span>
            </h2>

            {/* Larger Description (text-base instead of text-sm) */}
            <p className="text-base font-medium text-secondary leading-relaxed max-w-md mb-10 relative z-10">
              Practical coding courses for everyone. From your first line of code to building full-scale applications.
            </p>

            <div className="flex gap-4 relative z-10">
              <Link href="/courses">
                {/* Bolder Buttons (font-black) */}
                <button className="bg-emerald-glow text-black text-xs font-black uppercase px-8 py-4 hover:bg-white transition-all shadow-[4px_4px_0px_var(--surface-800)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
                  Start_Learning
                </button>
              </Link>
              <button className="bg-transparent border border-surface-700 text-teal-glow text-xs font-black uppercase px-8 py-4 hover:border-teal-glow hover:text-primary transition-all">
                Browse_Catalog
              </button>
            </div>
          </div>

          {/* Stats Panel - Increased size */}
          <div className="h-28 shrink-0 bg-surface-900 border border-surface-800 flex items-center justify-around px-6">
            <div className="text-center">
              <div className="text-2xl font-digital font-bold text-primary">10k+</div>
              <div className="text-[10px] font-bold text-secondary uppercase tracking-wider">Students</div>
            </div>
            <div className="w-[1px] h-10 bg-surface-800" />
            <div className="text-center">
              <div className="text-2xl font-digital font-bold text-primary">850+</div>
              <div className="text-[10px] font-bold text-secondary uppercase tracking-wider">Lessons</div>
            </div>
            <div className="w-[1px] h-10 bg-surface-800" />
            <div className="text-center">
              <div className="text-2xl font-digital font-bold text-emerald-glow">4.9</div>
              <div className="text-[10px] font-bold text-secondary uppercase tracking-wider">Rating</div>
            </div>
          </div>
        </section>


        {/* PANEL B: FEATURED CLUSTER (Width: 35%) */}
        <section className="flex-[1.5] h-full min-h-0 relative group overflow-hidden border border-surface-800 bg-surface-900 hover:border-purple-glow transition-all">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent z-10" />
          <img
            src="/images/mern-stack.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            alt="Featured"
          />
          <div className="relative z-20 p-8 h-full flex flex-col justify-end">
            <div className="mb-auto text-right">
              <span className="bg-surface-950 text-purple-glow border border-purple-glow/30 text-[10px] font-bold px-3 py-1.5 uppercase font-digital">
                Popular_Course
              </span>
            </div>

            <h3 className="text-4xl font-digital font-bold text-primary uppercase mb-3">
              Web <br /> Development
            </h3>
            {/* Increased text size */}
            <p className="text-sm font-medium text-gray-200 mb-8 line-clamp-3 leading-relaxed">
              Learn how to build modern websites. Perfect for beginners who want to master React, Node.js, and Databases.
            </p>
            <button className="w-full bg-purple-glow/90 backdrop-blur text-white text-xs font-black uppercase py-4 hover:bg-white hover:text-black transition-colors">
              View_Course
            </button>
          </div>
        </section>


        {/* PANEL C: ACTIVITY & LOGS (Width: 25%) */}
        <section className="flex-1 flex flex-col gap-4 h-full min-h-0">

          {/* Top: Quick Bento Grid */}
          <div className="flex-1 grid grid-rows-2 gap-4">
            <div className="bg-surface-900 border border-surface-800 p-4 flex flex-col justify-center items-center hover:border-teal-glow transition-colors cursor-pointer group/bento">
              <div className="text-3xl mb-2 group-hover/bento:text-teal-glow transition-colors">🐍</div>
              <h4 className="font-digital font-bold text-base uppercase text-primary">Python</h4>
              <span className="text-[9px] font-bold text-secondary mt-1">Beginner Friendly</span>
            </div>
            <div className="bg-surface-900 border border-surface-800 p-4 flex flex-col justify-center items-center hover:border-emerald-glow transition-colors cursor-pointer group/bento">
              <div className="text-3xl mb-2 group-hover/bento:text-emerald-glow transition-colors">🐳</div>
              <h4 className="font-digital font-bold text-base uppercase text-primary">DevOps</h4>
              <span className="text-[9px] font-bold text-secondary mt-1">Advanced Skills</span>
            </div>
          </div>

          {/* Bottom: Community Feed */}
          <div className="flex-[2] bg-surface-950 border border-surface-800 p-5 font-mono text-xs overflow-hidden flex flex-col">
            <div className="text-secondary border-b border-surface-800 pb-3 mb-3 font-bold uppercase tracking-widest">
              {">"} Community_Updates
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
              {[
                { time: "Just now", user: "Sarah", action: "Finished React Course" },
                { time: "2m ago", user: "System", action: "New Python Lesson Added" },
                { time: "15m ago", user: "Alex", action: "Earned 'Backend' Badge" },
                { time: "1h ago", user: "Mike", action: "Joined the Platform" },
                { time: "2h ago", user: "Team", action: "Updated Documentation" },
                { time: "3h ago", user: "Anna", action: "Started 'Web Dev' Path" },
              ].map((log, i) => (
                <div key={i} className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-default font-medium">
                  <span className="text-surface-600 font-bold">[{log.time}]</span>
                  <span className="text-emerald-glow font-bold">{log.user}:</span>
                  <span className="text-gray-400">{log.action}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>

      {/* 3. FOOTER (Status Bar) */}
      <footer className="mt-6 pt-3 border-t border-surface-800 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-secondary shrink-0">
        <div className="flex gap-6">
          <span>Server: <span className="text-teal-glow">Online</span></span>
          <span>Community: <span className="text-purple-glow">Active</span></span>
        </div>
        <div>
          Ready_To_Code
        </div>
      </footer>

    </div>
  );
}
