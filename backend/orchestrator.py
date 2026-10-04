from agents.coordinator import coordinator_agent
from agents.orbit_agent import orbit_agent
from agents.risk_agent import risk_agent
from agents.mission_agent import mission_agent
from agents.simulation_agent import simulation_agent
from agents.decision_agent import decision_agent
from supabase_client import supabase

def run_neurogrid(scenario):
    results = []

    coordinator = coordinator_agent(scenario)
    results.append(coordinator)

    orbit = orbit_agent(scenario)
    risk = risk_agent(scenario)
    mission = mission_agent(scenario)

    results.extend([orbit, risk, mission])

    simulation = simulation_agent(scenario, results)
    results.append(simulation)

    decision = decision_agent(scenario, results)

    results.append({
        "agent": decision["agent"],
        "status": decision["status"],
        "findings": decision["findings"],
        "analysis": decision["analysis"]
    })

    final_result = {
        "scenario": scenario.model_dump(),
        "agents": results,
        "final_assessment": decision["final_assessment"],
        "response_options": decision["response_options"]
    }

    # Save analysis to Supabase
    supabase.table("analyses").insert({
        "satellite_name": scenario.satellite_name,
        "altitude_km": scenario.altitude_km,
        "inclination_deg": scenario.inclination_deg,
        "scenario": scenario.scenario,
        "mission_priority": scenario.mission_priority,
        "final_assessment": decision["final_assessment"]
    }).execute()

    return final_result