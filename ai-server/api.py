from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import Dict, Any

from flood_prediction import predict_flood
from heatwave_prediction import predict_heatwave
from risk_score import calculate_risk_score
from recommendation_engine import generate_recommendations

app = FastAPI(title="ClimateTwinAI - SCOMC AI Prediction Module", version="1.0.0")

class ClimateData(BaseModel):
    rainfall: float = 0.0
    river_level: float = 0.0
    temperature: float = 0.0
    humidity: float = 0.0

@app.get("/")
def read_root():
    return {"message": "Welcome to ClimateTwinAI API"}

@app.get("/prediction/flood")
def get_flood_prediction(rainfall: float = 0.0, river_level: float = 0.0, humidity: float = 0.0):
    return predict_flood(rainfall, river_level, humidity)

@app.get("/prediction/heatwave")
def get_heatwave_prediction(temperature: float = 0.0, humidity: float = 0.0):
    return predict_heatwave(temperature, humidity)

@app.get("/prediction/risk-score")
def get_risk_score(score: float = 0.0):
    return calculate_risk_score(score)

@app.post("/prediction/analyze")
def analyze_climate_data(data: ClimateData):
    # Combine predictions
    flood_res = predict_flood(data.rainfall, data.river_level, data.humidity)
    heatwave_res = predict_heatwave(data.temperature, data.humidity)
    
    # Calculate a combined risk score for simplicity
    overall_score = max(flood_res.get("risk_probability", 0), heatwave_res.get("risk_probability", 0))
    risk_level = calculate_risk_score(overall_score)
    
    recommendations = generate_recommendations(risk_level["risk_category"])
    
    return {
        "analysis": {
            "flood_analysis": flood_res,
            "heatwave_analysis": heatwave_res,
            "overall_risk": risk_level
        },
        "recommendations": recommendations
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
