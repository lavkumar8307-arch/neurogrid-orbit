import React from "react";
import { Database, ShieldCheck, Cpu, Code, Shield, CheckCircle2, ArrowRight } from "lucide-react";

export const ArchitectureSection: React.FC = () => {
  const steps = [
    { num: "01", name: "Mission Inputs", tag: "TELEMETRY • TASK • RISK", icon: Database },
    { num: "02", name: "Validation layer", tag: "SCHEMA • BOUNDS • SOURCE", icon: ShieldCheck },
    { num: "03", name: "Agent mesh", tag: "6 SPECIALIST AGENTS", icon: Cpu },
    { num: "04", name: "Synthesis", tag: "EVIDENCE • CONFLICT • TRACE", icon: Code },
    { num: "05", name: "Decision support", tag: "3 HYPOTHETICAL PATHS", icon: Shield },
    { num: "06", name: "Human authority", tag: "REVIEW • APPROVE • COMMAND", icon: CheckCircle2, active: true },
  ];

  return (
    <section id="architecture" className="space-y-8 font-sans scroll-mt-24 pt-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase mb-2">
            <span>05</span>
            <span>——</span>
            <span>AI ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Built for explainability at every handoff.
          </h2>
        </div>

        <p className="max-w-md text-xs text-zinc-400 font-sans leading-relaxed">
          A modular decision-support stack separates telemetry ingestion, specialist reasoning, synthesis, and operator authority.
        </p>
      </div>

      {/* 6-Step Modular Flow Pipeline Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border font-mono space-y-3 flex flex-col justify-between relative transition-all ${
                s.active
                  ? "bg-emerald-950/20 border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                  : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg border ${s.active ? "bg-emerald-900/40 border-emerald-700 text-emerald-400" : "bg-zinc-950 border-zinc-800 text-cyan-400"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-100 font-sans">{s.name}</h4>
                <p className="text-[9px] text-zinc-500 uppercase tracking-tight">{s.tag}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Governance Banner */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>GOVERNANCE ACROSS EVERY STAGE</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] text-zinc-400">
          <span>• Source attribution</span>
          <span>• Uncertainty retained</span>
          <span>• Trace logging</span>
          <span>• Operator checkpoints</span>
        </div>
      </div>

      {/* Production Stack Main Container (Green Border) */}
      <div className="bg-zinc-900/90 border border-emerald-500/50 rounded-2xl p-6 backdrop-blur-xl grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
        
        {/* Column 1: Production Stack */}
        <div className="space-y-3 md:border-r border-zinc-800 md:pr-4">
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold uppercase">
            PRODUCTION STACK
          </span>
          <h3 className="text-base font-extrabold text-zinc-100 font-sans leading-snug">
            Purpose-built for fast, reviewable reasoning.
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-2">
            Modular providers and explicit fallbacks preserve service continuity without obscuring provenance.
          </p>
        </div>

        {/* Column 2: AI Core */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> AI CORE
          </h4>
          <ul className="space-y-1.5 text-[11px] text-zinc-300">
            <li>• 120B reasoning model</li>
            <li>• Low-latency inference cloud</li>
            <li>• Anthropic AI fallback</li>
            <li>• CrewAI multi-agent orchestration</li>
          </ul>
        </div>

        {/* Column 3: System Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" /> SYSTEM STACK
          </h4>
          <ul className="space-y-1.5 text-[11px] text-zinc-300">
            <li>• Backend: Python + FastAPI</li>
            <li>• Frontend: React + TypeScript</li>
            <li>• Styling: Tailwind CSS</li>
            <li>• Design System: shadcn/ui</li>
          </ul>
        </div>

        {/* Column 4: Mission Assurance */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> MISSION ASSURANCE
          </h4>
          <ul className="space-y-1.5 text-[11px] text-zinc-300">
            <li>• Human-in-the-loop authority</li>
            <li>• No autonomous command execution</li>
            <li>• Inspectable agent traces</li>
            <li>• Hypothetical scenario labeling</li>
          </ul>
        </div>

      </div>

    </section>
  );
};
