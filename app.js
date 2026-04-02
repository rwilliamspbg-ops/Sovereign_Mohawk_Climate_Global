const simulatedStats = {
  nodesOnline: 29144,
  flRound: 512,
  complianceScore: 98,
  tokenRate: 1320,
};

const simulatedRegions = [
  {
    name: "IPCC Polar Systems",
    zoneType: "Cryosphere",
    climateRisk: "Accelerated ice-loss volatility",
    modelConvergence: "94.8%",
    carbonSignal: "Permafrost methane signal rising",
  },
  {
    name: "North Atlantic Basin",
    zoneType: "Ocean Basin",
    climateRisk: "Cyclone intensification pressure",
    modelConvergence: "95.6%",
    carbonSignal: "Surface uptake variability increasing",
  },
  {
    name: "Equatorial Forest Belt",
    zoneType: "Biome Cluster",
    climateRisk: "Deforestation + drought compounding",
    modelConvergence: "93.9%",
    carbonSignal: "Net sink resilience weakening",
  },
  {
    name: "South Asian Monsoon Arc",
    zoneType: "Regional Climate System",
    climateRisk: "Monsoon onset instability",
    modelConvergence: "95.1%",
    carbonSignal: "Aerosol forcing uncertainty elevated",
  },
  {
    name: "Mediterranean Transition",
    zoneType: "Adaptation Hotspot",
    climateRisk: "Heatwave and wildfire coupling",
    modelConvergence: "96.2%",
    carbonSignal: "Land carbon stress index rising",
  },
  {
    name: "South Pacific Islands",
    zoneType: "Sea-Level Sentinel",
    climateRisk: "Coastal inundation acceleration",
    modelConvergence: "94.4%",
    carbonSignal: "Blue-carbon habitat disruption",
  },
];

const simulatedPipelineFeed = [
  "Round 512: 29,144 nodes submitted signed climate updates.",
  "Byzantine guards rejected 0.28% anomalous contributions.",
  "Streaming aggregation finalized across 5 regional quorums.",
  "zk-SNARK verification mean latency: 10.6 ms.",
  "PQC transport policy active for all cross-border channels.",
];

const simulatedRiskFeed = [
  "Extreme-weather model raised cyclone alert confidence in 7 basins.",
  "Carbon-flux model flagged sink degradation in 5 biome clusters.",
  "Biodiversity stress index exceeded threshold in 12 subregions.",
  "Sea-level ensemble widened adaptation urgency for 9 coastal zones.",
  "NDC progress model shows improved compliance in 14 jurisdictions.",
];

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function setDataMode(modeLabel) {
  setText("dataMode", `Data Mode: ${modeLabel}`);
}

function renderStats(stats) {
  setText("nodesOnline", Number(stats.nodesOnline || 0).toLocaleString());
  setText("flRound", String(stats.flRound || 0));
  setText("complianceScore", `${stats.complianceScore || 0}%`);
  setText("tokenRate", `${stats.tokenRate || 0} MHC/min`);
}

function renderRegions(regions) {
  const container = document.getElementById("regionGrid");
  const details = document.getElementById("regionDetails");
  if (!container || !details) {
    return;
  }

  container.innerHTML = "";

  regions.forEach((region) => {
    const button = document.createElement("button");
    button.className = "region-btn";
    button.type = "button";
    button.innerHTML = `<strong>${region.name}</strong><br/><small>${region.zoneType}</small>`;
    button.addEventListener("click", () => {
      details.innerHTML = `
        <strong>${region.name}</strong><br/>
        Zone type: ${region.zoneType}<br/>
        Climate risk: ${region.climateRisk}<br/>
        Convergence: ${region.modelConvergence}<br/>
        Carbon signal: ${region.carbonSignal}
      `;
    });
    container.appendChild(button);
  });
}

function renderFeed(listId, items) {
  const list = document.getElementById(listId);
  if (!list) {
    return;
  }

  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderEndpointStatus(statusItems) {
  renderFeed("endpointStatus", statusItems);
}

function getConfig() {
  const override = window.CLIMATE_DASHBOARD_CONFIG || {};
  return {
    timeoutMs: Number(override.timeoutMs || 3000),
    statsUrl: override.statsUrl || "/api/climate/stats",
    regionsUrl: override.regionsUrl || "/api/climate/regions",
    pipelineUrl: override.pipelineUrl || "/api/climate/pipeline",
    riskUrl: override.riskUrl || "/api/climate/risk",
    healthUrl: override.healthUrl || "/api/climate/health",
  };
}

async function fetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadLiveData(config) {
  const endpoints = [
    { key: "stats", url: config.statsUrl },
    { key: "regions", url: config.regionsUrl },
    { key: "pipeline", url: config.pipelineUrl },
    { key: "risk", url: config.riskUrl },
    { key: "health", url: config.healthUrl },
  ];

  const results = await Promise.allSettled(
    endpoints.map((endpoint) => fetchJson(endpoint.url, config.timeoutMs))
  );

  const data = {
    stats: { ...simulatedStats },
    regions: [...simulatedRegions],
    pipeline: [...simulatedPipelineFeed],
    risk: [...simulatedRiskFeed],
  };
  const endpointStatus = [];
  let liveSuccessCount = 0;

  results.forEach((result, index) => {
    const endpoint = endpoints[index];
    if (result.status === "fulfilled") {
      liveSuccessCount += 1;
      endpointStatus.push(`${endpoint.key}: live (${endpoint.url})`);

      if (endpoint.key === "stats") {
        const payload = result.value || {};
        data.stats = {
          nodesOnline: payload.nodesOnline || payload.nodes_online || data.stats.nodesOnline,
          flRound: payload.flRound || payload.fl_round || data.stats.flRound,
          complianceScore:
            payload.complianceScore || payload.compliance_score || data.stats.complianceScore,
          tokenRate: payload.tokenRate || payload.token_rate || data.stats.tokenRate,
        };
      }

      if (endpoint.key === "regions" && Array.isArray(result.value)) {
        data.regions = result.value;
      }

      if (endpoint.key === "pipeline") {
        if (Array.isArray(result.value)) {
          data.pipeline = result.value;
        } else if (Array.isArray(result.value.events)) {
          data.pipeline = result.value.events;
        }
      }

      if (endpoint.key === "risk") {
        if (Array.isArray(result.value)) {
          data.risk = result.value;
        } else if (Array.isArray(result.value.events)) {
          data.risk = result.value.events;
        }
      }

      if (endpoint.key === "health" && Array.isArray(result.value.services)) {
        result.value.services.forEach((service) => {
          endpointStatus.push(`service ${service.name}: ${service.status}`);
        });
      }
      return;
    }

    endpointStatus.push(
      `${endpoint.key}: simulated fallback (${endpoint.url}) - ${result.reason?.message || "unavailable"}`
    );
  });

  const mode = liveSuccessCount > 0 ? "Hybrid (Live + Simulation)" : "Climate Simulation";
  return { data, endpointStatus, mode };
}

async function initDashboard() {
  const config = getConfig();
  const { data, endpointStatus, mode } = await loadLiveData(config);
  setDataMode(mode);
  renderStats(data.stats);
  renderRegions(data.regions);
  renderFeed("pipelineFeed", data.pipeline);
  renderFeed("riskFeed", data.risk);
  renderEndpointStatus(endpointStatus);
}

initDashboard();
