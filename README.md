# Sovereign Mohawk Climate Global

Policy-gated federated learning for global climate intelligence.

Sovereign Mohawk Climate Global enables nation-sovereign and sensor-sovereign AI for carbon tracking, extreme weather prediction, biodiversity monitoring, sea-level risk analytics, and net-zero compliance without centralizing raw environmental data.

## Tagline

Sovereign Mohawk Climate Global: every sensor, satellite, and nation keeps full data sovereignty while training planetary-scale climate AI without ever sharing raw environmental data.

## Ecosystem

Core repositories:

- [Sovereign-Mohawk-Proto](https://github.com/rwilliamspbg-ops/Sovereign-Mohawk-Proto)
- [Sovereign_Map_Federated_Learning](https://github.com/rwilliamspbg-ops/Sovereign_Map_Federated_Learning)
- [Sovereign_Mohawk_Oncology_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Oncology_Global)
- [Sovereign_Mohawk_Agriculture_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Agriculture_Global)
- [Sovereign_Mohawk_Climate_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Climate_Global)
- [Sovereign_Mohawk_SupplyChain_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_SupplyChain_Global)

Canonical architecture and shared execution plans:

- [docs/ECOSYSTEM_ARCHITECTURE.md](docs/ECOSYSTEM_ARCHITECTURE.md)
- [docs/UNIFIED_PHASE2_MILESTONES.md](docs/UNIFIED_PHASE2_MILESTONES.md)
- [docs/GOVERNANCE_PR_ONLY.md](docs/GOVERNANCE_PR_ONLY.md)
- [docs/ACTION_PINNING_POLICY.md](docs/ACTION_PINNING_POLICY.md)
- [docs/PRODUCTION_DATA_PLANE_PLAN.md](docs/PRODUCTION_DATA_PLANE_PLAN.md)

## Ecosystem Fit (April 2, 2026)

- Proto: runtime, zk-SNARK verification, PQC, and BFT trust controls.
- Map: streaming aggregation profile, high-scale orchestration, tokenomics telemetry.
- Oncology: policy-gated wrapper and compliance workflow pattern.
- Agriculture: geospatial dashboard + operational map interaction baseline.

Progression:

Proto -> Map -> Oncology -> Agriculture -> Climate (specialized global climate sibling).

## Core Features

### 1) Policy-Gated Climate FL

- Signed model updates only.
- Regional policy checks and poisoned-update rejection.
- Differential privacy and secure aggregation in the climate wrapper path.

### 2) Geospatial Climate Intelligence Dashboard

- Region drill-down by IPCC zones, ocean basins, and biome clusters.
- Climate layers: carbon flux, extreme-weather convergence, biodiversity indices, sea-level pressure, and adaptation risk.
- FL pipeline, node health, compliance scorecards, and tokenomics telemetry.

### 3) Compliance and Sovereignty Toolkit

- Mapping support for Paris Agreement, NDC tracking, EU ETS, and CBAM-adjacent reporting controls.
- DPIA-style templates for environmental and satellite-linked data flows.
- Regional policy examples (for example, PQC-only weight acceptance).

### 4) LLM Governance + Threat Modeling

- Safe prompt workflows for climate scenario planning and adaptation policy analysis.
- STRIDE baseline for sensor spoofing, greenwashing manipulation, and data integrity attacks.

## Repository Layout

- `index.html`: climate dashboard entry.
- `app.js`: climate map, pipeline, and risk visualization logic.
- `styles.css`: UI style layer.
- `manifesto.html`: climate edition manifesto.
- `flower_security_wrapper/`: climate policy wrapper templates.
- `mock_api/`: local climate endpoint mock server.
- `docs/`: roadmap, integration, threat model, compliance evidence, beta release.
- `scripts/`: validation and artifact tooling.
- `examples/`: satellite + buoy workflow examples.
- `.github/workflows/`: CI, security, and pages deploy workflows.

## Quick Start

```bash
cd Sovereign_Mohawk_Climate_Global
python3 -m http.server 8080
```

Open: http://localhost:8080/

## Full Local Stack (Dashboard + Mock API)

```bash
docker compose -f docker-compose.mock.yml up
```

- Dashboard: http://localhost:8080/
- Mock API: http://localhost:8088/healthz

## Phase 2 Integration (Live Endpoint Wiring)

Default endpoint targets:

- `/api/climate/stats`
- `/api/climate/regions`
- `/api/climate/pipeline`
- `/api/climate/risk`
- `/api/climate/health`

You can override endpoints by setting `window.CLIMATE_DASHBOARD_CONFIG` before loading `app.js`.

```html
<script>
  window.CLIMATE_DASHBOARD_CONFIG = {
    statsUrl: "https://your-gateway.example.com/climate/stats",
    regionsUrl: "https://your-gateway.example.com/climate/regions",
    pipelineUrl: "https://your-gateway.example.com/climate/pipeline",
    riskUrl: "https://your-gateway.example.com/climate/risk",
    healthUrl: "https://your-gateway.example.com/climate/health",
    timeoutMs: 5000
  };
</script>
```

See `docs/PHASE2_INTEGRATION.md` for payload contracts.

## Validation

```bash
python3 scripts/validate_dashboard_contract.py
python3 -m unittest -q tests/test_contract_validator.py
```

## Status

Climate repository scaffold complete with CI/security baseline and local mock integration.
