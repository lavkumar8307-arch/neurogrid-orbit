import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";

interface NavbarProps {
  isBackendConnected: boolean;
  modelName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isBackendConnected }) => {
  const [utcTime, setUtcTime] = useState("");
  const [utcDate, setUtcDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().substring(11, 19) + " UTC");
      const day = String(now.getUTCDate()).padStart(2, "0");
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const month = monthNames[now.getUTCMonth()];
      const year = now.getUTCFullYear();
      setUtcDate(`${day} ${month} ${year}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-zinc-950/90 border-b border-zinc-800/80 px-4 lg:px-8 py-3 transition-all font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-widest text-zinc-100 uppercase">
                NeuroGrid <span className="text-amber-400">Orbit</span>
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 tracking-tight uppercase">
              MULTI-AGENT DECISION SUPPORT
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-zinc-400 uppercase tracking-wider font-semibold">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-cyan-400 transition-colors border-b-2 border-cyan-400 text-cyan-300 pb-0.5 cursor-pointer">OVERVIEW</button>
          <button onClick={() => scrollToSection("scenario-console")} className="hover:text-cyan-400 transition-colors border-b-2 border-transparent hover:border-cyan-400 pb-0.5 cursor-pointer">SCENARIO CONSOLE</button>
          <button onClick={() => scrollToSection("agent-matrix")} className="hover:text-cyan-400 transition-colors border-b-2 border-transparent hover:border-cyan-400 pb-0.5 cursor-pointer">AGENT MATRIX</button>
          <button onClick={() => scrollToSection("assessment")} className="hover:text-cyan-400 transition-colors border-b-2 border-transparent hover:border-cyan-400 pb-0.5 cursor-pointer">ASSESSMENT</button>
          <button onClick={() => scrollToSection("architecture")} className="hover:text-cyan-400 transition-colors border-b-2 border-transparent hover:border-cyan-400 pb-0.5 cursor-pointer">ARCHITECTURE</button>
        </nav>

        {/* UTC Clock & System Status Badge */}
        <div className="flex items-center gap-4 text-xs">
          
          <div className="hidden sm:flex flex-col text-right font-mono text-[11px]">
            <span className="text-zinc-200 font-bold">{utcTime}</span>
            <span className="text-zinc-500 text-[10px]">{utcDate}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 font-mono text-xs">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            <span>{isBackendConnected ? "SYSTEMS NOMINAL" : "LOCAL BACKEND"}</span>
          </div>

        </div>

      </div>
    </header>
  );
};
