import React from "react";
import { Download, Globe } from "lucide-react";

export const TechStackFooter: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-4 lg:px-8 mt-20 font-mono text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-sm text-zinc-100 tracking-wider">
                NeuroGrid <span className="text-amber-400">Orbit</span>
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed max-w-sm">
              Multi-agent AI decision support for LEO satellite operators. Built to clarify complex orbital scenarios while preserving human command authority.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              PRODUCT
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => scrollToSection("scenario-console")} className="hover:text-cyan-400 transition-colors">Scenario Console</button></li>
              <li><button onClick={() => scrollToSection("agent-matrix")} className="hover:text-cyan-400 transition-colors">Agent Matrix</button></li>
              <li><button onClick={() => scrollToSection("assessment")} className="hover:text-cyan-400 transition-colors">Assessment</button></li>
              <li><button onClick={() => scrollToSection("architecture")} className="hover:text-cyan-400 transition-colors">Architecture</button></li>
            </ul>
          </div>

          {/* Column 3: Trust Links */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              TRUST
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => scrollToSection("architecture")} className="hover:text-cyan-400 transition-colors">Safety model</button></li>
              <li><button onClick={() => scrollToSection("agent-matrix")} className="hover:text-cyan-400 transition-colors">Traceability</button></li>
              <li><button onClick={() => scrollToSection("assessment")} className="hover:text-cyan-400 transition-colors">Human authority</button></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Column 4: Mission Readiness CTA */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              MISSION READINESS
            </h4>
            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              Review the current analysis run with your mission team.
            </p>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-400 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>EXPORT ASSESSMENT</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© 2026 NEUROGRID ORBIT • DECISION SUPPORT ONLY</p>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ALL SYSTEMS NOMINAL
            </span>
            <span className="text-zinc-600 font-mono text-[10px]">BUILD NG-04.7</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
