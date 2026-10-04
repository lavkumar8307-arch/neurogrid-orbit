import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

NEBIUS_API_KEY = os.getenv("NEBIUS_API_KEY")
NEBIUS_MODEL = os.getenv(
    "NEBIUS_MODEL",
    "nvidia/nemotron-3-super-120b-a12b"
)

client = None

if NEBIUS_API_KEY and NEBIUS_API_KEY != "PASTE_YOUR_KEY_HERE":
    client = OpenAI(
        base_url="https://api.tokenfactory.nebius.com/v1/",
        api_key=NEBIUS_API_KEY
    )


def local_ai_analysis(agent_name, scenario, findings):

    scenario_text = scenario.scenario.lower()

    # -----------------------------
    # Orbit Agent
    # -----------------------------

    if agent_name == "Orbit Agent":
        return (
            f"Orbit assessment for {scenario.satellite_name}: "
            f"the scenario is at {scenario.altitude_km} km altitude "
            f"with an inclination of "
            f"{scenario.inclination_deg} degrees. "
            "The supplied parameters are being evaluated as a "
            "hypothetical LEO scenario."
        )

    # -----------------------------
    # Risk Agent
    # -----------------------------

    if agent_name == "Risk Agent":

        if "collision" in scenario_text and "debris" in scenario_text:
            return (
                "The scenario indicates a potential collision "
                "concern involving space debris. Actual collision "
                "probability cannot be determined from the supplied "
                "information alone. Validated tracking and "
                "conjunction data would be required."
            )

        if "collision" in scenario_text:
            return (
                "A potential collision concern was identified. "
                "Additional validated orbital data would be required "
                "before making an operational determination."
            )

        if "debris" in scenario_text:
            return (
                "Space-debris involvement was identified. "
                "Tracking and conjunction information would be "
                "required for a real risk assessment."
            )

        return (
            "No specific collision or debris indicator was "
            "identified from the supplied scenario."
        )

    # -----------------------------
    # Mission Agent
    # -----------------------------

    if agent_name == "Mission Agent":

        return (
            f"Mission priority is {scenario.mission_priority}. "
            "Mission objectives should be considered together "
            "with orbital and risk information."
        )

    # -----------------------------
    # Simulation Agent
    # -----------------------------

    if agent_name == "Simulation Agent":

        return (
            "The simulation layer compared the available agent "
            "findings and generated hypothetical response paths. "
            "This prototype does not perform physical orbital "
            "simulation."
        )

    # -----------------------------
    # Decision Agent
    # -----------------------------

    if agent_name == "Decision Agent":

        risk_count = len([
            finding
            for finding in findings
            if (
                "risk" in finding.lower()
                or "collision" in finding.lower()
                or "debris" in finding.lower()
            )
        ])

        response = (
            f"NeuroGrid Orbit synthesized the available agent "
            f"outputs for {scenario.satellite_name}. "
            f"The scenario describes a potential orbital risk "
            f"with {risk_count} risk-related indicators identified. "
        )

        if "collision" in scenario_text:
            response += (
                "A potential collision concern was identified, "
                "but the available information is insufficient "
                "to calculate an actual collision probability. "
            )

        if "debris" in scenario_text:
            response += (
                "Space-debris involvement requires validated "
                "tracking and conjunction information for a "
                "real operational assessment. "
            )

        response += (
            f"Mission priority is {scenario.mission_priority}. "
            "The generated response paths should be treated as "
            "hypothetical decision-support options. "
            "This prototype does not autonomously control "
            "spacecraft."
        )

        return response

    # -----------------------------
    # Default
    # -----------------------------

    return (
        f"{agent_name} analyzed the supplied scenario and "
        "contributed its findings to the NeuroGrid decision "
        "pipeline."
    )


def nebius_ai_analysis(agent_name, scenario, findings):

    if client is None:
        return None

    findings_text = "\n".join(
        f"- {finding}"
        for finding in findings
    )

    prompt = f"""
You are the {agent_name} inside NeuroGrid Orbit.

NeuroGrid Orbit is a multi-agent decision-support prototype
for hypothetical Low Earth Orbit satellite scenarios.

Analyze the scenario using the supplied findings.

Do not invent orbital measurements.
Do not claim to calculate collision probability.
Clearly state uncertainty.
Do not provide autonomous spacecraft-control instructions.

Satellite: {scenario.satellite_name}
Altitude: {scenario.altitude_km} km
Inclination: {scenario.inclination_deg} degrees
Mission Priority: {scenario.mission_priority}

Scenario:
{scenario.scenario}

Findings:
{findings_text}

Provide a concise professional analysis.
"""

    try:

        response = client.chat.completions.create(
            model=NEBIUS_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an aerospace decision-support "
                        "AI agent."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=300
        )

        return response.choices[0].message.content.strip()

    except Exception as error:

        print(
            f"[Nebius] {agent_name} unavailable: "
            f"{type(error).__name__}"
        )

        return None


def generate_ai_analysis(agent_name, scenario, findings):

    # Try Nebius/Nemotron first
    ai_result = nebius_ai_analysis(
        agent_name,
        scenario,
        findings
    )

    if ai_result:
        return ai_result

    # Otherwise use local AI-style reasoning
    return local_ai_analysis(
        agent_name,
        scenario,
        findings
    )