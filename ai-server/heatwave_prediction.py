from typing import Optional
from utils import get_temperature_data, get_humidity_data

def predict_heatwave(
    temperature: Optional[float] = None,
    humidity: Optional[float] = None,
    date: Optional[str] = None,
    location: Optional[str] = None
) -> dict:
    """
    Estimate heatwave risk using standard meteorological rules from input or CSV datasets.
    """
    # If inputs are missing/None, load from CSV datasets
    if temperature is None:
        temperature = get_temperature_data(date, location)
    if humidity is None:
        humidity = get_humidity_data(date, location)

    # Simplified Heat Index calculation
    heat_index = round(temperature + (0.5 * humidity), 2)
    
    # Classify heatwave risk
    if temperature > 40.0 or heat_index > 85.0:
        risk = "Critical"
        warning = "Extreme Heatwave Alert! Danger of heatstroke."
        recommendation = "Open Relief Centers & Dispatch Hydration Teams"
    elif temperature > 35.0 or heat_index > 70.0:
        risk = "High"
        warning = "Heatwave Warning. Limit outdoor activities."
        recommendation = "Send Citizen Alerts & Monitor Vulnerable Groups"
    elif temperature > 30.0 or heat_index > 55.0:
        risk = "Medium"
        warning = "Moderate Heat Warning. Stay hydrated."
        recommendation = "Review Preparedness & Hydration Advisories"
    else:
        risk = "Normal"
        warning = "No immediate danger."
        recommendation = "Normal Operations"
        
    return {
        "temperature_used": temperature,
        "humidity_used": humidity,
        "heat_index": heat_index,
        "heatwave_risk": risk,
        "warning": warning,
        "recommendation": recommendation
    }

