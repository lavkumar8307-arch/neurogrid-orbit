from ai_engine import generate_ai_analysis


def risk_agent(scenario):
    findings = [
        "Scenario requires assessment of orbital and mission risks.",
        "The supplied information does not represent a complete "
        "collision-probability calculation."
    ]

    scenario_text = scenario.scenario.lower()

    if "debris" in scenario_text:
        findings.append("Space-debris involvement was mentioned.")

    if "collision" in scenario_text:
        findings.append("Potential collision concern was mentioned.")

    analysis = generate_ai_analysis(
        "Risk Agent",
        scenario,
        findings
    )

    return {
        "agent": "Risk Agent",
        "status": "complete",
        "findings": findings,
        "analysis": analysis
    }