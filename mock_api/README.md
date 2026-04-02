# Mock API

Local mock service for dashboard live endpoint mode.

Run locally:

```bash
python3 mock_api/server.py
```

Health check:

```bash
curl -fsS http://localhost:8088/healthz
```

Endpoints:

- `/api/climate/stats`
- `/api/climate/regions`
- `/api/climate/pipeline`
- `/api/climate/risk`
- `/api/climate/health`
