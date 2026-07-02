from typing import Optional
from utils import get_rainfall_data, get_river_level_data, get_humidity_data

def predict_flood(
    rainfall: Optional[float] = None, 
    river_level: Optional[float] = None, 
    humidity: Optional[float] = None,
    date: Optional[str] = None,
    location: Optional[str] = None
) -> dict:
    """
    Predict flood probability and risk category using real-time dataset loading or explicit inputs.
    """
    # If inputs are missing/None, load from CSV datasets
    if rainfall is None:
        rainfall = get_rainfall_data(date, location)
    if river_level is None:
        river = "Godavari" if not location else location
        river_level = get_river_level_data(date, river)
    if humidity is None:
        humidity = get_humidity_data(date, location)

    # Calculate flood probability using normalized formula:
    # - Rainfall (max 150mm): 50% weight
    # - River Level (max 6.0m): 40% weight
    # - Humidity (max 100%): 10% weight
    rain_score = (min(rainfall, 150.0) / 150.0) * 50.0
    river_score = (min(river_level, 6.0) / 6.0) * 40.0
    humidity_score = (min(humidity, 100.0) / 100.0) * 10.0
    
    probability = round(rain_score + river_score + humidity_score, 2)
    
    if probability > 80:
        risk_level = "Critical"
        recommendation = "Deploy Pumps, Issue Flood Warning, & Evacuate Low-lying Areas"
    elif probability > 60:
        risk_level = "High"
        recommendation = "Deploy Emergency Teams & Monitor High-Risk Zones"
    elif probability > 40:
        risk_level = "Medium"
        recommendation = "Review Preparedness & Monitor Situation"
    else:
        risk_level = "Low"
        recommendation = "Normal Operations"
        
    return {
        "rainfall_used": rainfall,
        "river_level_used": river_level,
        "humidity_used": humidity,
        "risk_probability": probability,
        "risk_level": risk_level,
        "recommendation": recommendation
    }

