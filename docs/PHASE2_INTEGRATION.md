# PHASE2_INTEGRATION

This guide defines expected payload contracts for live climate endpoint wiring.

## Endpoint Contracts

### GET /api/climate/stats

```json
{
  "nodes_online": 25021,
  "fl_round": 418,
  "compliance_score": 98,
  "token_rate": 1050
}
```

Accepted aliases:

- `nodesOnline` or `nodes_online`
- `flRound` or `fl_round`
- `complianceScore` or `compliance_score`
- `tokenRate` or `token_rate`

### GET /api/climate/regions

```json
[
  {
    "name": "North Atlantic Basin",
    "zoneType": "Ocean Basin",
    "climateRisk": "Cyclone intensification pressure",
    "modelConvergence": "95.6%",
    "carbonSignal": "Surface uptake variability increasing"
  }
]
```

### GET /api/climate/pipeline

Either array form:

```json
[
  "Round 418: 25,021 nodes submitted signed climate updates."
]
```

Or object form:

```json
{
  "events": [
    "Round 418: 25,021 nodes submitted signed climate updates."
  ]
}
```

### GET /api/climate/risk

Either array form:

```json
[
  "Cyclone intensity model flagged escalation in 4 basins."
]
```

Or object form:

```json
{
  "events": [
    "Cyclone intensity model flagged escalation in 4 basins."
  ]
}
```

### GET /api/climate/health

```json
{
  "services": [
    { "name": "orchestrator", "status": "up" },
    { "name": "prometheus", "status": "up" },
    { "name": "grafana", "status": "up" }
  ]
}
```

## Runtime Behavior

- If one or more endpoints respond, dashboard enters `Hybrid (Live + Simulation)` mode.
- If all endpoints fail, dashboard remains in `Climate Simulation` mode.
- Endpoint status panel always shows live/fallback state for each endpoint.
