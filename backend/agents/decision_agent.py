from ai_engine import generate_ai_analysis


def decision_agent(scenario, results):
    """
    Decision Agent

    Combines the outputs of the specialized agents and produces
    a final decision-support assessment.

    Uses the configured AI engine when available and falls back
    to local reasoning when external AI is unavailable.
    """

    risk_mentions = []
    simulation_options = []

    # ------------------------------------------
    # COLLECT INFORMATION FROM ALL AGENTS
    # ------------------------------------------

    for result in results:

        for finding in result.get("findings", []):

            lower = finding.lower()

            if (
                "risk" in lower
                or "collision" in lower
                or "debris" in lower
            ):
                risk_mentions.append(finding)

        if result.get("agent") == "Simulation Agent":

            simulation_options = result.get(
                "alternatives",
                []
            )

    # ------------------------------------------
    # COUNT RISK INDICATORS
    # ------------------------------------------

    risk_count = len(risk_mentions)

    if risk_count == 1:

        risk_text = (
            "risk-related indicator was identified"
        )

    else:

        risk_text = (
            "risk-related indicators were identified"
        )

    # ------------------------------------------
    # DECISION FINDINGS
    # ------------------------------------------

    findings = [

        "Information from the specialized agents "
        "was combined.",

        f"{len(simulation_options)} hypothetical "
        "response paths were reviewed.",

        f"{risk_count} {risk_text}.",

        "Final decision-support assessment requested."

    ]

    # ------------------------------------------
    # AI DECISION ANALYSIS
    # ------------------------------------------

    ai_analysis = generate_ai_analysis(
        "Decision Agent",
        scenario,
        findings
    )

    # ------------------------------------------
    # LOCAL FALLBACK
    # ------------------------------------------

    if not ai_analysis:

        ai_analysis = (

            f"NeuroGrid Orbit analyzed the hypothetical "
            f"scenario for {scenario.satellite_name}. "

            f"The multi-agent pipeline identified "
            f"{risk_count} relevant risk indicators. "

            "The scenario involves potential orbital "
            "risk and should be reviewed using validated "
            "tracking and mission data. "

            "This system provides decision support and "
            "does not perform autonomous spacecraft control."

        )

    # ------------------------------------------
    # RESPONSE OPTIONS
    # ------------------------------------------

    options = simulation_options

    if not options:

        options = [

            "Review the identified risk factors with "
            "validated orbital data.",

            "Compare the scenario against additional "
            "hypothetical cases.",

            "Escalate the assessment for mission-team review."

        ]

    # ------------------------------------------
    # RETURN DECISION
    # ------------------------------------------

    return {

        "agent": "Decision Agent",

        "status": "complete",

        "findings": findings,

        "analysis": ai_analysis,

        "final_assessment": ai_analysis,

        "response_options": options

    }