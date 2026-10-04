import React from "react";
import { Brain, FileCheck, ArrowUpRight, Lock, AlertTriangle } from "lucide-react";

interface AssessmentDashboardProps {
  finalAssessment?: string;
  responseOptions?: any[];
  satelliteName: string;
}

export const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
  finalAssessment,
  satelliteName,
}) => {
  const defaultAssessment =
    "Based on available agent outputs for SAT-LEO-01, the scenario describes a potential orbital risk with one risk-related event identified, but the available information is insufficient to calculate an actual collision probability. Mission priority is HIGH. The generated response paths are hypothetical and require validation against authoritative conjunction data, current ephemerides, spacecraft constraints, and operator procedures.";

  return (
    <div id="assessment" className="space-y-16 font-sans scroll-mt-24">
      
      {/* SECTION 03: SYNTHESIZED ASSESSMENT */}
      <section className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase mb-2">
              <span>03</span>
              <span>——</span>
              <span>SYNTHESIZED ASSESSMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Evidence in. Judgment supported—not replaced.
            </h2>
          </div>

          <p className="max-w-md text-xs text-zinc-400 font-sans leading-relaxed">
            A consolidated readout of the six-agent run, written for rapid review by a qualified mission team.
          </p>
        </div>

        {/* Assessment Card Box (Golden/Amber border + Split Columns) */}
        <div className="bg-zinc-900/90 border border-amber-500/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Main Assessment Text) */}
          <div className="lg:col-span-7 space-y-5 border-b lg:border-b-0 lg:border-r border-zinc-800 pb-6 lg:pb-0 lg:pr-6">
            
            {/* Badges Row */}
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-violet-950 text-violet-300 border border-violet-800 font-bold text-xs">
                  <Brain className="w-3.5 h-3.5 animate-pulse" /> SYNTHESIZED
                </span>
                <span className="text-cyan-400 font-bold">{satelliteName || "SAT-LEO-01"}</span>
              </div>
              <span className="text-zinc-500 text-[11px]">23:41:33 UTC • NG-04A7</span>
            </div>

            {/* Assessment Text Box */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200 leading-relaxed space-y-3">
              <p className="text-zinc-200 underline decoration-cyan-500/50 decoration-2 underline-offset-4">
                {finalAssessment || defaultAssessment}
              </p>
            </div>

            {/* Safety Warning Box */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 flex items-start gap-3 text-amber-300 font-mono text-xs">
              <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                NeuroGrid Orbit provides operational decision-support recommendations only. Final command execution authority remains with qualified mission operators.
              </p>
            </div>

            {/* Status Tags */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold">
              <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                1 RISK EVENT
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                PRIORITY HIGH
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                HUMAN REVIEW REQUIRED
              </span>
            </div>

          </div>

          {/* Right Column (Assessment Evidence & Meters) */}
          <div className="lg:col-span-5 space-y-5 font-mono">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">ASSESSMENT EVIDENCE</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                <FileCheck className="w-3 h-3" /> REVIEW READY
              </span>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-zinc-100">
                  <span className="text-cyan-400">01</span>
                  <span>Potential conjunction requires verification</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pl-6">
                  The scenario should be reconciled against authoritative tracking and conjunction products before operational use.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-zinc-100">
                  <span className="text-cyan-400">02</span>
                  <span>No autonomous actuation</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pl-6">
                  All modeled response paths terminate at an operator decision gate; no control commands are produced.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-zinc-100">
                  <span className="text-cyan-400">03</span>
                  <span>Assumptions remain inspectable</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pl-6">
                  Agent outputs, uncertainty statements, and disagreements are preserved in the trace log.
                </p>
              </div>

            </div>

            {/* Meters */}
            <div className="pt-4 border-t border-zinc-800 space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">EVIDENCE COMPLETENESS</span>
                  <span className="text-amber-400 font-bold">68% • MODERATE</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-amber-400 w-[68%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">AGENT AGREEMENT</span>
                  <span className="text-emerald-400 font-bold">84% • HIGH</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-emerald-400 w-[84%]" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 04: RESPONSE-PATH OPTIONS */}
      <section className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase mb-2">
              <span>04</span>
              <span>——</span>
              <span>RESPONSE-PATH OPTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Three paths to review. Zero automatic commands.
            </h2>
          </div>

          <p className="max-w-md text-xs text-zinc-400 font-sans leading-relaxed">
            Alternative courses of action are intentionally hypothetical. Each path exposes trade-offs and ends at a defined human decision gate.
          </p>
        </div>

        {/* 3 Response Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Option 01 (Cyan Border) */}
          <div className="bg-zinc-900/90 border border-cyan-500/50 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs font-bold uppercase">
                  OPTION 01
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-100 font-sans">
                Maintain enhanced tracking
              </h3>

              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                Continue close monitoring while requesting updated tracking products and preserving the current spacecraft state.
              </p>

              <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">NO MANEUVER</span>
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">LOW DISRUPTION</span>
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">DATA DEPENDENT</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 font-mono text-xs space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">REQUIRED OPERATOR GATE</span>
              <button className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer">
                <span>Continue / escalate review</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Option 02 (Purple Border) */}
          <div className="bg-zinc-900/90 border border-violet-500/50 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-violet-950 text-violet-300 border border-violet-800 font-mono text-xs font-bold uppercase">
                  OPTION 02
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-100 font-sans">
                Evaluate orbital adjustment
              </h3>

              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                Model a hypothetical collision-avoidance maneuver against fuel, payload, and downstream mission constraints.
              </p>

              <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">MANEUVER STUDY</span>
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">FUEL IMPACT</span>
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">RE-SCREEN REQUIRED</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 font-mono text-xs space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">REQUIRED OPERATOR GATE</span>
              <button className="text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1 cursor-pointer">
                <span>Approve planning study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Option 03 (Gold Border) */}
          <div className="bg-zinc-900/90 border border-amber-500/50 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-xs font-bold uppercase">
                  OPTION 03
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-100 font-sans">
                Escalate mission response
              </h3>

              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                Convene the mission response team, validate conjunction evidence, and prepare time-bounded contingency procedures.
              </p>

              <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">CROSS-TEAM</span>
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">HIGH PRIORITY</span>
                <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded">PROCEDURE LED</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 font-mono text-xs space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">REQUIRED OPERATOR GATE</span>
              <button className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer">
                <span>Mission director review</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 font-mono text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <p className="text-[11px]">
            These paths are decision-support constructs, not operational instructions. Validate all inputs through authoritative mission systems and approved procedures.
          </p>
        </div>

      </section>

    </div>
  );
};
