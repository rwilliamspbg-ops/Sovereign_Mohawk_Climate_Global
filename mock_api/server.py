#!/usr/bin/env python3
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SAMPLES = ROOT / "contracts" / "samples"

ROUTES = {
    "/api/climate/stats": "stats.json",
    "/api/climate/regions": "regions.json",
    "/api/climate/pipeline": "pipeline.json",
    "/api/climate/risk": "risk.json",
    "/api/climate/health": "health.json",
}


class Handler(BaseHTTPRequestHandler):
    def _write_json(self, code: int, payload: object) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/healthz":
            self._write_json(200, {"ok": True, "service": "climate-mock-api"})
            return

        sample = ROUTES.get(self.path)
        if sample is None:
            self._write_json(404, {"error": "not_found", "path": self.path})
            return

        payload = json.loads((SAMPLES / sample).read_text(encoding="utf-8"))
        self._write_json(200, payload)


def main() -> None:
    server = HTTPServer(("0.0.0.0", 8088), Handler)
    print("climate mock api listening on :8088")
    server.serve_forever()


if __name__ == "__main__":
    main()
