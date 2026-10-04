from ai_engine import generate_ai_analysis


def mission_agent(scenario):
    priority = scenario.mission_priority.lower()

    if priority == "critical":
        finding = "Mission priority is marked as critical."
    elif priority == "high":
        finding = "Mission priority is marked as high."
    else:
        finding = "Mission priority is normal or unspecified."

    findings = [
        finding,
        "Mission objectives should be considered alongside "
        "orbital risk information."
    ]

    analysis = generate_ai_analysis(
        "Mission Agent",
        scenario,
        findings
    )

    return {
        "agent": "Mission Agent",
        "status": "complete",
        "findings": findings,
        "analysis": analysis
    }