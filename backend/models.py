from pydantic import BaseModel
from typing import Dict, List


class OrbitScenario(BaseModel):
    satellite_name: str
    altitude_km: float
    inclination_deg: float
    scenario: str
    mission_priority: str = "Normal"


class AgentResult(BaseModel):
    agent: str
    status: str
    findings: List[str]
    analysis: str


class NeuroGridResponse(BaseModel):
    scenario: Dict
    agents: List[AgentResult]
    final_assessment: str
    response_options: List[str]