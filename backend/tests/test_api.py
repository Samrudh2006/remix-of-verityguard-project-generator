import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_articles():
    """Test getting articles list."""
    response = client.get("/api/articles/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_verify_claim():
    """Test claim verification endpoint."""
    response = client.post(
        "/api/verification/verify",
        json={"claim": "Test claim for verification"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "trust_score" in data
    assert "verdict" in data

def test_get_leaderboard():
    """Test leaderboard endpoint."""
    response = client.get("/api/gamification/leaderboard")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_analytics():
    """Test analytics endpoint."""
    response = client.get("/api/analytics/overview")
    assert response.status_code == 200
    data = response.json()
    assert "total_users" in data
    assert "total_articles" in data
