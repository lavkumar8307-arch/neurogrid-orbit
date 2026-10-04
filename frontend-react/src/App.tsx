import { useState, useEffect, useRef } from "react";
import ImageStreamHero from "./components/ui/image-stream-hero";
import { Navbar } from "./components/Navbar";
import { HeroStream } from "./components/HeroStream";
import { ScenarioConsole, type ScenarioInput } from "./components/ScenarioConsole";
import { AgentPipelineGrid, type AgentResult } from "./components/AgentPipelineGrid";
import { AssessmentDashboard } from "./components/AssessmentDashboard";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { TechStackFooter } from "./components/TechStackFooter";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const satelliteImages = [
  {
    src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=90",
    alt: "Earth from space",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=90",
    alt: "Earth and space",
  },
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=90",
    alt: "Deep space",
  },
  {
    src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1600&q=90",
    alt: "Satellite in orbit",
  },
];

const DEFAULT_SCENARIO: ScenarioInput = {
  satellite_name: "SAT-LEO-01",
  altitude_km: 550.0,
  inclination_deg: 53.0,
  mission_priority: "HIGH",
  scenario: "Conjunction alert: Trackable space-debris object #49201 intersecting orbital path in 42 minutes with 35m projected miss distance. Potential high-velocity collision risk.",
  miss_distance_km: 0.42,
  time_to_approach: "18:42",
  propellant_reserve: 64,
};

function App() {
  const [scenario, setScenario] = useState<ScenarioInput>(DEFAULT_SCENARIO);
  const [agents, setAgents] = useState<AgentResult[]>([]);
  const [finalAssessment, setFinalAssessment] = useState<string>("");
  const [responseOptions, setResponseOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const consoleRef = useRef<HTMLDivElement>(null);
  const modelName = "NVIDIA Nemotron-3 Super 120B";

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === "online") {
            setIsBackendConnected(true);
          }
        } else {
          setIsBackendConnected(false);
        }
      } catch (err) {
        setIsBackendConnected(false);
      }
    };

    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToConsole = () => {
    consoleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scenario),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAgents(data.agents || []);
      setFinalAssessment(data.final_assessment || "");
      setResponseOptions(data.response_options || []);
      setIsBackendConnected(true);
    } catch (err: any) {
      console.error("Failed to connect to backend:", err);
      setErrorMsg("Failed to connect to FastAPI backend at http://localhost:8000. Ensure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar isBackendConnected={isBackendConnected} modelName={modelName} />

      {/* FIRST PAGE HERO SCREEN (3D IMAGE CORRIDOR) - UNCHANGED AS REQUESTED */}
      <section className="relative min-h-screen overflow-hidden border-b border-zinc-800">
        <ImageStreamHero
          images={satelliteImages}
          cards={10}
          speed={20}
          axis={52}
          className="min-h-screen"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-black/35" />

          {/* Center glow */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.12),transparent_45%)]" />

          {/* Main content */}
          <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
            <div className="max-w-5xl text-center">

              {/* Upper text group */}
              <div className="-translate-y-8">

                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300">
                  AI-POWERED ORBITAL INTELLIGENCE
                </p>

                <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-9xl">
                  NeuroGrid
                  <span className="text-cyan-300"> Orbit</span>
                </h1>

                <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Multi-agent AI decision support for complex Low Earth Orbit scenarios.
                </p>

                <p className="mt-5 text-sm font-medium uppercase tracking-[0.35em] text-cyan-200/70">
                  ONE GRID. INFINITE INTELLIGENCE.
                </p>

              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                <button
                  type="button"
                  onClick={scrollToConsole}
                  className="rounded-xl border border-cyan-300/50 bg-cyan-400/15 px-8 py-3.5 text-sm font-semibold text-cyan-100 backdrop-blur-md transition duration-300 hover:bg-cyan-400/25 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)] cursor-pointer"
                >
                  Launch Analysis
                </button>

                <button
                  type="button"
                  onClick={scrollToConsole}
                  className="rounded-xl border border-white/20 bg-black/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/10 cursor-pointer"
                >
                  Explore System
                </button>

              </div>

              {/* System status badge */}
              <div className="mt-10 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-white/50">

                <span className={`h-2 w-2 animate-pulse rounded-full ${isBackendConnected ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" : "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"}`} />

                {isBackendConnected ? "NEUROGRID SYSTEM ONLINE" : "CONNECTING TO FASTAPI BACKEND..."}

              </div>

            </div>
          </div>
        </ImageStreamHero>
      </section>

      {/* SECONDARY & NEXT PAGES - MATCHING FIGMA SCREENSHOTS 1 TO 5 */}
      <HeroStream />

      <main ref={consoleRef} className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-16 space-y-20">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm font-mono flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button 
              onClick={() => setErrorMsg(null)}
              className="text-rose-400 hover:text-rose-200 underline text-xs ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <ScenarioConsole
          scenario={scenario}
          setScenario={setScenario}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        <AgentPipelineGrid agents={agents} isLoading={isLoading} />

        <AssessmentDashboard
          finalAssessment={finalAssessment}
          responseOptions={responseOptions}
          satelliteName={scenario.satellite_name}
        />

        <ArchitectureSection />
      </main>

      <TechStackFooter />
    </div>
  );
}

export default App;