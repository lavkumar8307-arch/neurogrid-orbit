/*
=========================================================
NEUROGRID ORBIT
Premium Mission Control Frontend
=========================================================
*/


// =======================================================
// PRESET SCENARIOS
// =======================================================

const scenarios = {

    debris: {

        satellite: "ORBIT-X1",

        altitude: 550,

        inclination: 53,

        priority: "High",

        description:
            "A hypothetical satellite detects a nearby space debris object while operating in Low Earth Orbit. The operator needs to assess the potential orbital and mission risks."

    },


    collision: {

        satellite: "ORBIT-X2",

        altitude: 520,

        inclination: 51.6,

        priority: "Critical",

        description:
            "A hypothetical satellite scenario involving a possible collision concern with another tracked object in a crowded orbital region."

    },


    congestion: {

        satellite: "ORBIT-X3",

        altitude: 600,

        inclination: 97.8,

        priority: "Normal",

        description:
            "A hypothetical orbital region contains multiple spacecraft and tracked objects. The operator needs to evaluate the implications of increasing orbital congestion."

    },


    mission: {

        satellite: "ORBIT-X4",

        altitude: 500,

        inclination: 45,

        priority: "Critical",

        description:
            "A hypothetical mission faces a conflict between maintaining mission objectives and responding to a developing orbital risk indicator."

    }

};


// =======================================================
// DOM REFERENCES
// =======================================================

const satelliteInput =
    document.getElementById("satellite");

const altitudeInput =
    document.getElementById("altitude");

const inclinationInput =
    document.getElementById("inclination");

const priorityInput =
    document.getElementById("priority");

const scenarioInput =
    document.getElementById("scenario");

const resultBox =
    document.getElementById("result");

const optionsBox =
    document.getElementById("options");

const completedCount =
    document.getElementById("completedCount");

const metricAltitude =
    document.getElementById("metricAltitude");

const metricInclination =
    document.getElementById("metricInclination");

const metricPriority =
    document.getElementById("metricPriority");

const agentCards =
    document.querySelectorAll(".agent-card");

const agentNodes =
    document.querySelectorAll(".agent-node");

const presetButtons =
    document.querySelectorAll(".preset-btn");

const runButton =
    document.querySelector(".run-button");

const networkStatus =
    document.querySelector(".network-status");

const assessmentStatus =
    document.querySelector(".assessment-status");


// =======================================================
// LOAD PRESET SCENARIO
// =======================================================

function loadScenario(type) {

    const selected =
        scenarios[type];

    if (!selected) {
        return;
    }


    satelliteInput.value =
        selected.satellite;

    altitudeInput.value =
        selected.altitude;

    inclinationInput.value =
        selected.inclination;

    priorityInput.value =
        selected.priority;

    scenarioInput.value =
        selected.description;


    // Update selected button

    presetButtons.forEach(button => {

        button.classList.remove("active");

    });


    const selectedButton =
        document.querySelector(
            `.preset-btn[data-scenario="${type}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add("active");

    }


    updateMetrics();

}


// =======================================================
// UPDATE METRICS
// =======================================================

function updateMetrics() {

    metricAltitude.textContent =
        altitudeInput.value || "—";


    metricInclination.textContent =
        inclinationInput.value || "—";


    metricPriority.textContent =
        (priorityInput.value || "NORMAL").toUpperCase();

}


// =======================================================
// RESET AGENT UI
// =======================================================

function resetAgents() {

    agentCards.forEach(card => {

        card.classList.remove(
            "analyzing",
            "complete",
            "error"
        );


        const status =
            card.querySelector(".agent-status");


        const details =
            card.querySelector(".agent-details");


        if (status) {

            status.textContent =
                "WAITING";

        }


        if (details) {

            details.innerHTML =
                "";

        }

    });


    agentNodes.forEach(node => {

        node.classList.remove(
            "active",
            "complete"
        );

    });


    completedCount.textContent =
        "0";

}


// =======================================================
// SET NETWORK STATUS
// =======================================================

function setNetworkStatus(
    text,
    type = "ready"
) {

    if (!networkStatus) {
        return;
    }


    networkStatus.innerHTML = "";


    const dot =
        document.createElement("i");


    const label =
        document.createElement("span");


    label.textContent =
        text;


    networkStatus.appendChild(dot);

    networkStatus.appendChild(label);


    if (type === "active") {

        dot.style.background =
            "var(--cyan)";

        dot.style.boxShadow =
            "0 0 10px var(--cyan)";

        label.style.color =
            "var(--cyan)";

    }


    else if (type === "complete") {

        dot.style.background =
            "var(--green)";

        dot.style.boxShadow =
            "0 0 10px var(--green)";

        label.style.color =
            "var(--green)";

    }

}


// =======================================================
// SET ASSESSMENT STATUS
// =======================================================

function setAssessmentStatus(
    text,
    type = "waiting"
) {

    if (!assessmentStatus) {
        return;
    }


    assessmentStatus.innerHTML =
        "";


    const dot =
        document.createElement("span");


    const label =
        document.createElement("span");


    dot.style.width =
        "6px";

    dot.style.height =
        "6px";

    dot.style.borderRadius =
        "50%";


    label.textContent =
        text;


    if (type === "active") {

        dot.style.background =
            "var(--cyan)";

        dot.style.boxShadow =
            "0 0 10px var(--cyan)";

        label.style.color =
            "var(--cyan)";

    }


    else if (type === "complete") {

        dot.style.background =
            "var(--green)";

        dot.style.boxShadow =
            "0 0 10px var(--green)";

        label.style.color =
            "var(--green)";

    }


    else {

        dot.style.background =
            "var(--dim)";

        label.style.color =
            "var(--dim)";

    }


    assessmentStatus.appendChild(dot);

    assessmentStatus.appendChild(label);

}


// =======================================================
// DISPLAY AGENT DETAILS
// =======================================================

function displayAgentDetails(
    card,
    agentResult
) {

    const details =
        card.querySelector(".agent-details");


    if (!details) {
        return;
    }


    details.innerHTML =
        "";


    // Findings

    if (
        agentResult.findings &&
        Array.isArray(agentResult.findings)
    ) {

        agentResult.findings.forEach(
            finding => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "agent-finding";


                item.textContent =
                    "• " + finding;


                details.appendChild(
                    item
                );

            }
        );

    }


    // Analysis

    if (agentResult.analysis) {

        const analysis =
            document.createElement(
                "div"
            );


        analysis.className =
            "agent-analysis";


        analysis.textContent =
            agentResult.analysis;


        details.appendChild(
            analysis
        );

    }


    // Simulation response paths

    if (
        agentResult.alternatives &&
        Array.isArray(
            agentResult.alternatives
        )
    ) {

        const title =
            document.createElement(
                "div"
            );


        title.className =
            "agent-analysis-title";


        title.textContent =
            "RESPONSE PATHS";


        details.appendChild(
            title
        );


        agentResult.alternatives.forEach(
            alternative => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "agent-finding";


                item.textContent =
                    "→ " + alternative;


                details.appendChild(
                    item
                );

            }
        );

    }

}


// =======================================================
// ANIMATE AGENT
// =======================================================

function animateAgent(
    agentResult,
    index
) {

    return new Promise(resolve => {

        const card =
            agentCards[index];


        const node =
            agentNodes[index];


        if (!card) {

            resolve();

            return;

        }


        const status =
            card.querySelector(
                ".agent-status"
            );


        // ACTIVE

        card.classList.add(
            "analyzing"
        );


        if (status) {

            status.textContent =
                "ANALYZING";

        }


        if (node) {

            node.classList.add(
                "active"
            );

        }


        // COMPLETE

        setTimeout(() => {

            card.classList.remove(
                "analyzing"
            );


            card.classList.add(
                "complete"
            );


            if (status) {

                status.textContent =
                    "COMPLETE";

            }


            if (node) {

                node.classList.remove(
                    "active"
                );

                node.classList.add(
                    "complete"
                );

            }


            displayAgentDetails(
                card,
                agentResult
            );


            const current =
                Number(
                    completedCount.textContent
                ) + 1;


            completedCount.textContent =
                current.toString();


            resolve();

        }, 850);

    });

}


// =======================================================
// ANALYZE SCENARIO
// =======================================================

async function analyzeScenario() {

    if (!runButton) {
        return;
    }


    resetAgents();


    updateMetrics();


    // Button state

    runButton.disabled =
        true;


    const runText =
        runButton.querySelector(
            ".run-text"
        );


    if (runText) {

        runText.textContent =
            "ANALYZING NETWORK...";

    }


    setNetworkStatus(
        "PROCESSING",
        "active"
    );


    setAssessmentStatus(
        "AGENTS PROCESSING",
        "active"
    );


    resultBox.textContent =
        "Specialized agents are processing the scenario...";


    optionsBox.innerHTML =
        `<div class="empty-option">
            Waiting for decision layer...
        </div>`;


    // Collect input

    const data = {

        satellite_name:
            satelliteInput.value.trim(),

        altitude_km:
            Number(
                altitudeInput.value
            ),

        inclination_deg:
            Number(
                inclinationInput.value
            ),

        scenario:
            scenarioInput.value.trim(),

        mission_priority:
            priorityInput.value

    };


    // Basic validation

    if (
        !data.satellite_name ||
        !data.scenario ||
        Number.isNaN(data.altitude_km) ||
        Number.isNaN(data.inclination_deg)
    ) {

        resultBox.textContent =
            "Please complete the scenario information before running NeuroGrid.";

        runButton.disabled =
            false;

        if (runText) {

            runText.textContent =
                "RUN NEUROGRID";

        }

        setNetworkStatus(
            "INPUT REQUIRED",
            "ready"
        );

        setAssessmentStatus(
            "INPUT REQUIRED",
            "waiting"
        );

        return;

    }


    try {

        // =========================================
        // BACKEND REQUEST
        // =========================================

        const response =
            await fetch(
                "http://127.0.0.1:8000/analyze",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)

                }
            );


        if (!response.ok) {

            throw new Error(
                `Backend returned ${response.status}`
            );

        }


        const result =
            await response.json();


        if (
            !result.agents ||
            !Array.isArray(
                result.agents
            )
        ) {

            throw new Error(
                "Invalid NeuroGrid response."
            );

        }


        // =========================================
        // AGENT PROCESSING
        // =========================================

        for (
            let index = 0;
            index < result.agents.length;
            index++
        ) {

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        250
                    )
            );


            await animateAgent(
                result.agents[index],
                index
            );

        }


        // =========================================
        // FINAL ASSESSMENT
        // =========================================

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    450
                )
        );


        resultBox.textContent =
            result.final_assessment ||
            "No final assessment was returned.";


        // =========================================
        // RESPONSE OPTIONS
        // =========================================

        optionsBox.innerHTML =
            "";


        if (
            result.response_options &&
            Array.isArray(
                result.response_options
            )
        ) {

            result.response_options.forEach(
                option => {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "response-option";


                    item.textContent =
                        option;


                    optionsBox.appendChild(
                        item
                    );

                }
            );

        }

        else {

            optionsBox.innerHTML =
                `<div class="empty-option">
                    No response paths returned.
                </div>`;

        }


        // =========================================
        // COMPLETE
        // =========================================

        setNetworkStatus(
            "ANALYSIS COMPLETE",
            "complete"
        );


        setAssessmentStatus(
            "ASSESSMENT READY",
            "complete"
        );


        if (runText) {

            runText.textContent =
                "RUN AGAIN";

        }


        runButton.disabled =
            false;


        // Scroll to result

        setTimeout(() => {

            document
                .querySelector(
                    ".assessment-section"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }, 200);


    }

    catch (error) {

        console.error(
            "NeuroGrid error:",
            error
        );


        // =========================================
        // ERROR STATE
        // =========================================

        resultBox.textContent =
            "Unable to connect to the NeuroGrid backend. Make sure FastAPI is running on port 8000.";


        optionsBox.innerHTML = `

            <div class="response-option">
                Check that the backend server is running.
            </div>

            <div class="response-option">
                Confirm that http://127.0.0.1:8000 is available.
            </div>

            <div class="response-option">
                Refresh the page and try again.
            </div>

        `;


        agentCards.forEach(
            card => {

                card.classList.remove(
                    "analyzing",
                    "complete"
                );

                card.classList.add(
                    "error"
                );


                const status =
                    card.querySelector(
                        ".agent-status"
                    );


                if (status) {

                    status.textContent =
                        "ERROR";

                }

            }
        );


        agentNodes.forEach(
            node => {

                node.classList.remove(
                    "active",
                    "complete"
                );

            }
        );


        setNetworkStatus(
            "CONNECTION ERROR",
            "ready"
        );


        setAssessmentStatus(
            "ANALYSIS FAILED",
            "waiting"
        );


        runButton.disabled =
            false;


        if (runText) {

            runText.textContent =
                "TRY AGAIN";

        }

    }

}


// =======================================================
// LIVE INPUT METRICS
// =======================================================

altitudeInput.addEventListener(
    "input",
    updateMetrics
);


inclinationInput.addEventListener(
    "input",
    updateMetrics
);


priorityInput.addEventListener(
    "change",
    updateMetrics
);


// =======================================================
// INITIAL STATE
// =======================================================

updateMetrics();

loadScenario("debris");