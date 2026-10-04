from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import OrbitScenario
from orchestrator import run_neurogrid


app = FastAPI(
    title="NeuroGrid Orbit",
    description="Multi-agent AI decision-support prototype",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "NeuroGrid Orbit",
        "status": "online",
        "message": "One Grid. Infinite Intelligence."
    }


@app.post("/analyze")
def analyze(scenario: OrbitScenario):
    result = run_neurogrid(scenario)
    return result