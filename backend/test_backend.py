import unittest
from fastapi.testclient import TestClient
from main import app


class TestNeuroGridBackend(unittest.TestCase):

    def setUp(self):
        self.client = TestClient(app)

    def test_home_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["project"], "NeuroGrid Orbit")
        self.assertEqual(data["status"], "online")

    def test_analyze_endpoint_collision(self):
        payload = {
            "satellite_name": "TEST-SAT-01",
            "altitude_km": 500.0,
            "inclination_deg": 51.6,
            "mission_priority": "HIGH",
            "scenario": "Space debris collision hazard detected in target trajectory."
        }
        response = self.client.post("/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("agents", data)
        self.assertIn("final_assessment", data)
        self.assertIn("response_options", data)
        self.assertGreater(len(data["agents"]), 0)

    def test_analyze_endpoint_nominal(self):
        payload = {
            "satellite_name": "TEST-SAT-02",
            "altitude_km": 600.0,
            "inclination_deg": 98.2,
            "mission_priority": "Normal",
            "scenario": "Nominal orbital sweep with zero debris interference."
        }
        response = self.client.post("/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("agents", data)
        self.assertEqual(len(data["agents"]), 6)


if __name__ == "__main__":
    unittest.main()
