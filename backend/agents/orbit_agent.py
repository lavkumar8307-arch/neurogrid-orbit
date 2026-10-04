from ai_engine import generate_ai_analysis


def orbit_agent(scenario):
    findings = []

    if scenario.altitude_km < 300:
        findings.append("Very low orbital altitude supplied.")
    elif scenario.altitude_km <= 2000:
        findings.append("Scenario is within the Low Earth Orbit range.")
    else:
        findings.append("Altitude is outside the typical LEO range.")

    if 0 <= scenario.inclination_deg <= 180:
        findings.append(
            f"Inclination supplied: {scenario.inclination_deg} degrees."
        )

    analysis = generate_ai_analysis(
        "Orbit Agent",
        scenario,
        findings
    )

    return {
        "agent": "Orbit Agent",
        "status": "complete",
        "findings": findings,
        "analysis": analysis
    }