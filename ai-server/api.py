from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

from flood_prediction import predict_flood
from heatwave_prediction import predict_heatwave
from risk_score import calculate_risk_score
from recommendation_engine import generate_recommendations

app = FastAPI(title="ClimateTwinAI - SCOMC AI Prediction Module", version="1.0.0")

class ClimateData(BaseModel):
    rainfall: Optional[float] = None
    river_level: Optional[float] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    date: Optional[str] = None
    location: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Welcome to ClimateTwinAI API"}

@app.get("/prediction/flood")
def get_flood_prediction(
    rainfall: Optional[float] = None, 
    river_level: Optional[float] = None, 
    humidity: Optional[float] = None,
    date: Optional[str] = None,
    location: Optional[str] = None
):
    return predict_flood(rainfall, river_level, humidity, date, location)

@app.get("/prediction/heatwave")
def get_heatwave_prediction(
    temperature: Optional[float] = None, 
    humidity: Optional[float] = None,
    date: Optional[str] = None,
    location: Optional[str] = None
):
    return predict_heatwave(temperature, humidity, date, location)

@app.get("/prediction/risk-score")
def get_risk_score(
    score: Optional[float] = None,
    date: Optional[str] = None,
    location: Optional[str] = None
):
    return calculate_risk_score(score, date, location)

@app.post("/prediction/analyze")
def analyze_climate_data(data: ClimateData):
    # Combine predictions, allowing internal fallback to CSV datasets if values are omitted
    flood_res = predict_flood(
        rainfall=data.rainfall, 
        river_level=data.river_level, 
        humidity=data.humidity, 
        date=data.date, 
        location=data.location
    )
    heatwave_res = predict_heatwave(
        temperature=data.temperature, 
        humidity=data.humidity, 
        date=data.date, 
        location=data.location
    )
    
    # Calculate a combined overall risk score
    flood_prob = flood_res.get("risk_probability", 0.0)
    
    # Estimate heatwave probability as normalized heat_index (max ~120)
    heat_idx = heatwave_res.get("heat_index", 0.0)
    heatwave_prob = (min(heat_idx, 120.0) / 120.0) * 100.0
    
    overall_score = round(max(flood_prob, heatwave_prob), 2)
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
