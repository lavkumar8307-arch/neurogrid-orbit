import React from "react";
import { Sparkles, Sliders, CheckCircle2 } from "lucide-react";

export interface ScenarioInput {
  satellite_name: string;
  altitude_km: number;
  inclination_deg: number;
  mission_priority: string;
  scenario: string;
  miss_distance_km?: number;
  time_to_approach?: string;
  propellant_reserve?: number;
}

interface ScenarioConsoleProps {
  scenario: ScenarioInput;
  setScenario: React.Dispatch<React.SetStateAction<ScenarioInput>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

const PRESETS = [
  {
    id: "A",
    title: "Debris conjunction",
    desc: "Evaluate potential orbital risk from a tracked object crossing the predicted corridor.",
    data: {
      satellite_name: "SAT-LEO-01",
      altitude_km: 550.0,
      inclination_deg: 53.0,
      mission_priority: "HIGH",
      scenario: "Conjunction alert: Trackable space-debris object #49201 intersecting orbital path in 42 minutes with 35m projected miss distance. Potential high-velocity collision risk.",
      miss_distance_km: 0.42,
      time_to_approach: "18:42",
      propellant_reserve: 64,
    },
  },
  {
    id: "B",
    title: "Orbital adjustment",
    desc: "Assess a hypothetical along-track maneuver under limited propulsion margin.",
    data: {
      satellite_name: "SAT-LEO-02",
      altitude_km: 520.0,
      inclination_deg: 51.6,
      mission_priority: "CRITICAL",
      scenario: "Orbital adjustment study: Evaluate along-track delta-V maneuver of 1.4 m/s to increase radial separation against secondary tracked body while conserving remaining fuel reserve.",
      miss_distance_km: 1.15,
      time_to_approach: "45:10",
      propellant_reserve: 42,
    },
  },
  {
    id: "C",
    title: "Link degradation",
    desc: "Model a communications outage during a high-priority observation window.",
    data: {
      satellite_name: "SAT-LEO-03",
      altitude_km: 600.0,
      inclination_deg: 97.8,
      mission_priority: "NORMAL",
      scenario: "Link degradation event: Solar radiation flare degrading ground telemetry link margin by 12 dB during scheduled pass. Model contingency autonomous tracking envelope.",
      miss_distance_km: 3.80,
      time_to_approach: "02:15:00",
      propellant_reserve: 88,
    },
  },
];

export const ScenarioConsole: React.FC<ScenarioConsoleProps> = ({
  scenario,
  setScenario,
  onAnalyze,
  isLoading,
}) => {
  const [selectedPresetId, setSelectedPresetId] = React.useState("A");

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setSelectedPresetId(preset.id);
    setScenario(preset.data);
  };

  return (
    <section id="scenario-console" className="space-y-8 font-sans scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase mb-2">
            <span>01</span>
            <span>——</span>
            <span>ORBITAL SCENARIO CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Model the encounter before it becomes a command.
          </h2>
        </div>

        <p className="max-w-md text-xs text-zinc-400 font-sans leading-relaxed">
          Configure hypothetical telemetry and operational constraints. The console generates decision-support analysis—not autonomous spacecraft control.
        </p>
      </div>

      {/* 3-Column Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Scenario Presets */}
        <div className="lg:col-span-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 backdrop-blur-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
              <span>SCENARIO PRESETS</span>
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="space-y-3">
              {PRESETS.map((p) => {
                const isSelected = selectedPresetId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-950/30 border-amber-500/80 shadow-lg shadow-amber-500/10"
                        : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                      <span className={`font-bold ${isSelected ? "text-amber-400" : "text-zinc-400"}`}>
                        SCENARIO {p.id}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> SELECTED
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-zinc-100 font-sans mb-1">
                      {p.title}
                    </h4>

                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans line-clamp-2">
                      {p.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => handleSelectPreset(PRESETS[0])}
            className="w-full py-2.5 rounded-xl border border-dashed border-zinc-700 hover:border-cyan-500 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer text-center"
          >
            + NEW CUSTOM SCENARIO
          </button>
        </div>

        {/* Center Column: 3D Predictive Corridor Canvas */}
        <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
          
          {/* Header */}
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 font-bold">3D PREDICTIVE CORRIDOR</span>
            </div>
            <span className="text-[11px] text-zinc-500">EPOCH 2026-10-04T23:41:08Z</span>
          </div>

          {/* Canvas Graphic Area */}
          <div className="relative my-6 w-full aspect-[4/3] flex items-center justify-center rounded-xl bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 border border-zinc-800/50 p-4">
            
            {/* 3D Wireframe Globe & Vector Orbits SVG */}
            <svg className="w-full h-full max-h-[280px]" viewBox="0 0 500 350" fill="none">
              {/* Grid plane background */}
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#27272a" strokeWidth="0.5" />
              </pattern>
              <rect width="500" height="350" fill="url(#grid)" opacity="0.3" />

              {/* Wireframe Earth Globe */}
              <circle cx="250" cy="180" r="75" stroke="#18181b" fill="#09090b" strokeWidth="2" />
              <ellipse cx="250" cy="180" rx="75" ry="25" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse cx="250" cy="180" rx="75" ry="50" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="250" y1="105" x2="250" y2="255" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />

              {/* Cyan Orbital Path (SAT-LEO-01) */}
              <ellipse cx="250" cy="180" rx="170" ry="80" stroke="#06b6d4" strokeWidth="2" transform="rotate(-20 250 180)" />
              
              {/* Red Dashed Risk Trajectory */}
              <path d="M 100 280 L 380 90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" />

              {/* Conjunction Point Node */}
              <circle cx="340" cy="115" r="14" fill="#f43f5e" opacity="0.2" className="animate-ping" />
              <circle cx="340" cy="115" r="7" fill="#f43f5e" />

              {/* Satellite Position Node */}
              <circle cx="160" cy="225" r="6" fill="#38bdf8" />
              <text x="120" y="245" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">SAT-LEO-01</text>
            </svg>

            {/* Closest Approach Callout Overlay Card */}
            <div className="absolute bottom-12 right-12 p-3 rounded-xl bg-zinc-900/90 border border-amber-500/60 shadow-2xl backdrop-blur-md font-mono text-xs space-y-1">
              <span className="text-[10px] text-amber-400 font-bold block tracking-wider uppercase">CLOSEST APPROACH</span>
              <div className="text-sm font-extrabold text-zinc-100">
                {scenario.miss_distance_km ?? 0.42} KM
              </div>
              <div className="text-[10px] text-zinc-400">
                Pc 1.84 × 10⁻⁴
              </div>
            </div>

          </div>

          {/* Bottom Legend */}
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> SAT-LEO-01</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> RISK OBJECT</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> CLOSE APPROACH</span>
            </div>
          </div>

        </div>

        {/* Right Column: Telemetry Controls & Execution CTA */}
        <div className="lg:col-span-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-5 backdrop-blur-xl flex flex-col justify-between font-mono">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">TELEMETRY CONTROLS</span>
              <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 text-[10px] font-bold">
                HYPOTHETICAL
              </span>
            </div>

            {/* Asset Altitude */}
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 block uppercase">ASSET ALTITUDE</label>
              <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
                <span className="font-bold text-zinc-100">{scenario.altitude_km}</span>
                <span className="text-zinc-500">KM</span>
              </div>
            </div>

            {/* Inclination */}
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 block uppercase">INCLINATION</label>
              <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
                <span className="font-bold text-zinc-100">{scenario.inclination_deg}</span>
                <span className="text-zinc-500">DEG</span>
              </div>
            </div>

            {/* Miss Distance */}
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 block uppercase">MISS DISTANCE</label>
              <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
                <span className="font-bold text-amber-400">{scenario.miss_distance_km ?? 0.42}</span>
                <span className="text-zinc-500">KM</span>
              </div>
            </div>

            {/* Time to Approach */}
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 block uppercase">TIME TO APPROACH</label>
              <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
                <span className="font-bold text-rose-400">{scenario.time_to_approach ?? "18:42"}</span>
                <span className="text-zinc-500">HH:MM</span>
              </div>
            </div>

            {/* Mission Priority Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400 uppercase">MISSION PRIORITY</span>
                <span className="text-cyan-400 font-bold">82%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-cyan-400 w-[82%]" />
              </div>
            </div>

            {/* Propellant Reserve Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400 uppercase">PROPELLANT RESERVE</span>
                <span className="text-emerald-400 font-bold">{scenario.propellant_reserve ?? 64}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-emerald-400" style={{ width: `${scenario.propellant_reserve ?? 64}%` }} />
              </div>
            </div>

          </div>

          {/* Execute CTA */}
          <div className="space-y-2 pt-4 border-t border-zinc-800">
            <button
              onClick={onAnalyze}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>ORCHESTRATING AGENTS...</span>
                </>
              ) : (
                <>
                  <span>EXECUTE AGENT ANALYSIS</span>
                  <Sparkles className="w-4 h-4 fill-zinc-950" />
                </>
              )}
            </button>

            <p className="text-[10px] text-zinc-500 text-center leading-tight">
              No spacecraft commands are generated or transmitted from this interface.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
