import React from "react";
import { ArrowDownRight, ShieldCheck, Radio, Target, Clock, Lock } from "lucide-react";

export const HeroStream: React.FC = () => {
  const scrollToConsole = () => {
    document.getElementById("scenario-console")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToArchitecture = () => {
    document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative border-b border-zinc-800/80 bg-zinc-950 py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Main Title & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pills */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 font-mono text-xs text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SAT-LEO-01 / LIVE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">RUN 04A7</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400">SECURE SESSION</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight leading-none font-sans">
              Decision intelligence for the orbital edge.
            </h2>

            {/* Description */}
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl font-sans">
              Six specialized AI agents transform LEO telemetry into transparent, reviewable response paths—keeping mission operators in command at every decision boundary.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs font-bold">
              <button
                onClick={scrollToConsole}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] cursor-pointer"
              >
                <span>OPEN SCENARIO CONSOLE</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToArchitecture}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-all cursor-pointer"
              >
                <span>REVIEW SAFETY MODEL</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

          </div>

          {/* Right Visual Orbit Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-cyan-950/20 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
              
              {/* Decorative Globe & Orbital Ellipse SVG */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="120" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" />
                  <ellipse cx="200" cy="200" rx="170" ry="85" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-25 200 200)" />
                  <ellipse cx="200" cy="200" rx="150" ry="60" stroke="#eab308" strokeWidth="1" strokeDasharray="2 4" transform="rotate(15 200 200)" />
                  <circle cx="290" cy="140" r="8" fill="#f43f5e" className="animate-ping" />
                  <circle cx="290" cy="140" r="6" fill="#f43f5e" />
                </svg>
              </div>

              <div className="relative z-10 flex items-center justify-between font-mono text-xs">
                <span className="text-cyan-400 font-bold">ORBITAL CORRIDOR SYNC</span>
                <span className="text-zinc-500">550.0 KM</span>
              </div>

              <div className="relative z-10 text-center space-y-1">
                <div className="text-3xl font-extrabold text-zinc-100 font-mono tracking-widest">
                  SAT-LEO-01
                </div>
                <p className="text-xs text-amber-400 font-mono">
                  CONJUNCTION WINDOW ACTIVE (T-18:42)
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-2 font-mono text-[11px] pt-4 border-t border-zinc-800">
                <div>
                  <span className="text-zinc-500 block">MISS DISTANCE</span>
                  <span className="text-rose-400 font-bold">0.42 KM</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block">PROBABILITY (Pc)</span>
                  <span className="text-amber-400 font-bold">1.84 × 10⁻⁴</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Telemetry Bar (Amber/Gold Border Container) */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/40 shadow-xl font-mono text-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <span className="text-zinc-500 text-[10px] block">TARGET ASSET</span>
            <span className="text-amber-400 font-bold text-sm">SAT-LEO-01</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] block">ALTITUDE</span>
            <span className="text-zinc-100 font-bold text-sm">550.0 KM</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] block">INCLINATION</span>
            <span className="text-zinc-100 font-bold text-sm">55.0 DEG</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] block">GROUND SPEED</span>
            <span className="text-zinc-100 font-bold text-sm">7.59 KM/S</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] block">PRIORITY</span>
            <span className="text-rose-400 font-bold text-sm">HIGH</span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-rose-400/80 text-[10px] block uppercase font-bold">COMMAND AUTHORITY</span>
            <span className="text-zinc-300 text-[11px] font-semibold">Human operator retained</span>
          </div>
        </div>

        {/* Live Operational State Grid */}
        <div className="space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px]">
                LIVE OPERATIONAL STATE
              </span>
              <span className="text-zinc-500 text-[11px]">LAST TELEMETRY +00:00:02</span>
            </div>
            <span className="text-zinc-600 text-[11px]">HITL PROTOCOL • NG-0/SAFE-04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase">TELEMETRY LINK</span>
                <span className="text-xl font-bold text-emerald-400">99.98%</span>
              </div>
              <Radio className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase">TRACKING QUALITY</span>
                <span className="text-xl font-bold text-cyan-400">0.08° <span className="text-xs text-zinc-500">3σ</span></span>
              </div>
              <Target className="w-5 h-5 text-cyan-400 shrink-0" />
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase">CONJUNCTION WINDOW</span>
                <span className="text-xl font-bold text-amber-400">18:42 <span className="text-xs text-zinc-500">T- HH:MM</span></span>
              </div>
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            </div>

            {/* Human-in-the-loop Card */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-900/40 border border-amber-700 text-amber-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-300">Human-in-the-loop by design</h4>
                <p className="text-[11px] text-zinc-400 leading-tight font-sans">
                  Orbit provides decision-support recommendations only. Final command execution authority remains with qualified mission operators.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
