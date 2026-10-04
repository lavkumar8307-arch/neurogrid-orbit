def simulation_agent(scenario, previous_results):

    scenario_text = scenario.scenario.lower()

    alternatives = []

    if "collision" in scenario_text or "debris" in scenario_text:
        alternatives = [
            "Scenario A: Continue monitoring while validating tracking data.",
            "Scenario B: Evaluate a hypothetical orbital adjustment.",
            "Scenario C: Escalate the scenario for mission-team review."
        ]
    else:
        alternatives = [
            "Scenario A: Continue nominal mission operations.",
            "Scenario B: Increase monitoring and reassess conditions.",
            "Scenario C: Escalate for additional mission analysis."
        ]

    return {
        "agent": "Simulation Agent",
        "status": "complete",
        "findings": [
            "Baseline scenario evaluated.",
            "Three hypothetical response paths generated.",
            "This prototype does not perform physical orbital simulation."
        ],
        "analysis": (
            "The simulation layer compared the specialized-agent "
            "findings and generated hypothetical response paths "
            "for decision analysis."
        ),
        "alternatives": alternatives
    }