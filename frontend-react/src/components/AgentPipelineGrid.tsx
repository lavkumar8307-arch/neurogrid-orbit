import React from "react";
import { Target, Orbit, AlertTriangle, Scale, FlaskConical, Brain, CheckCircle2, ArrowUpRight } from "lucide-react";

export interface AgentResult {
  agent: string;
  status: string;
  findings: string;
  analysis?: string;
}

interface AgentPipelineGridProps {
  agents: AgentResult[];
  isLoading: boolean;
}

const AGENTS_META = [
  {
    num: "01",
    id: "task",
    name: "Task Agent",
    role: "TASK INGESTION",
    icon: Target,
    desc: "Parses orbital, risk, mission, and resource constraints into a bounded operator-reviewed objective.",
    tag: "CONSTRAINT GRAPH",
    border: "border-amber-500/50",
    badge: "bg-amber-950/60 text-amber-300 border-amber-800",
  },
  {
    num: "02",
    id: "orbit",
    name: "Orbit Agent",
    role: "ORBITAL MECHANICS & KINEMATIC VECTORS",
    icon: Orbit,
    desc: "Assesses SAT-LEO-01 at 550.0 km and 55.0° inclination using supplied state vectors and ephemeris context.",
    tag: "STATE SOLUTION",
    border: "border-cyan-500/50",
    badge: "bg-cyan-950/60 text-cyan-300 border-cyan-800",
  },
  {
    num: "03",
    id: "risk",
    name: "Risk Agent",
    role: "HAZARD & CONJUNCTION ASSESSMENT",
    icon: AlertTriangle,
    desc: "Frames the hypothetical encounter, uncertainty envelope, proximity risk, and evidence gaps without overstating certainty.",
    tag: "RISK ENVELOPE",
    border: "border-rose-500/50",
    badge: "bg-rose-950/60 text-rose-300 border-rose-800",
  },
  {
    num: "04",
    id: "tradeoff",
    name: "Trade-off Agent",
    role: "OPERATIONAL TRADE-OFF ANALYSIS",
    icon: Scale,
    desc: "Compares mission continuity, fuel reserve, tracking confidence, and downstream operational impact.",
    tag: "UTILITY MATRIX",
    border: "border-indigo-500/50",
    badge: "bg-indigo-950/60 text-indigo-300 border-indigo-800",
  },
  {
    num: "05",
    id: "simulation",
    name: "Simulation Agent",
    role: "HYPOTHETICAL RESPONSE STRATEGY GENERATION",
    icon: FlaskConical,
    desc: "Generates bounded, non-command response paths for mission-team review under the selected assumptions.",
    tag: "SCENARIO PATHS",
    border: "border-emerald-500/50",
    badge: "bg-emerald-950/60 text-emerald-300 border-emerald-800",
  },
  {
    num: "06",
    id: "decision",
    name: "Decision Agent",
    role: "EXECUTIVE MULTI-AGENT SYNTHESIS",
    icon: Brain,
    desc: "Synthesizes evidence, disagreements, confidence, and operator checkpoints into decision-support recommendations.",
    tag: "ASSESSMENT",
    border: "border-violet-500/50",
    badge: "bg-violet-950/60 text-violet-300 border-violet-800",
  },
];

export const AgentPipelineGrid: React.FC<AgentPipelineGridProps> = ({ agents, isLoading }) => {
  return (
    <section id="agent-matrix" className="space-y-8 font-sans scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase mb-2">
            <span>02</span>
            <span>——</span>
            <span>AGENT EXECUTION MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Six specialists. One traceable assessment.
          </h2>
        </div>

        <p className="max-w-md text-xs text-zinc-400 font-sans leading-relaxed">
          Each agent contributes a bounded analytical artifact. The Decision Agent synthesizes their outputs while preserving assumptions, uncertainty, and human review points.
        </p>
      </div>

      {/* Top Status Banner */}
      <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/40 font-mono text-xs flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" /> RUN COMPLETE
          </span>
          <span className="text-zinc-300">
            ANALYSIS RUN <strong className="text-cyan-400">NG-04A7</strong>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">6/6 AGENTS RESPONDED</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400 text-xs">
          <span>24.8 S TOTAL</span>
          <button className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold uppercase cursor-pointer">
            <span>TRACE LOG</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Agent Cards Grid (2 rows x 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS_META.map((meta) => {
          const Icon = meta.icon;
          const liveData = agents.find(
            (a) => a.agent.toLowerCase().includes(meta.id) || a.agent.toLowerCase().includes(meta.name.toLowerCase())
          );

          return (
            <div
              key={meta.id}
              className={`bg-zinc-900/90 border ${meta.border} rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:shadow-xl transition-all group`}
            >
              <div className="space-y-3">
                {/* Card Top Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-100 font-sans">
                        {meta.name}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-tight">
                        {meta.role}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border uppercase ${meta.badge}`}>
                    {isLoading ? "RUNNING..." : "SYNTHESIZED"}
                  </span>
                </div>

                {/* Description / Findings */}
                <p className="text-xs text-zinc-300 font-mono leading-relaxed min-h-[60px] pt-2">
                  {liveData ? (liveData.analysis || liveData.findings) : meta.desc}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <span>{meta.num}</span>
                  <span>——</span>
                  <span className="text-zinc-400 font-semibold">{meta.tag}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
