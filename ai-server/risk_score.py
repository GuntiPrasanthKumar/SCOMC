from typing import Optional
from flood_prediction import predict_flood
from heatwave_prediction import predict_heatwave

def calculate_risk_score(
    score_value: Optional[float] = None,
    date: Optional[str] = None,
    location: Optional[str] = None
) -> dict:
    """
    Evaluates total climate risk score. If input score is omitted, 
    calculates it by querying flood and heatwave predictions for a given date/location.
    """
    if score_value is None:
        # Get predictions based on datasets for the given date/location
        flood_res = predict_flood(date=date, location=location)
        heatwave_res = predict_heatwave(date=date, location=location)
        
        # Estimate heatwave probability as normalized heat_index (max ~120)
        heat_idx = heatwave_res.get("heat_index", 0.0)
        heatwave_prob = (min(heat_idx, 120.0) / 120.0) * 100.0
        
        flood_prob = flood_res.get("risk_probability", 0.0)
        score_value = round(max(flood_prob, heatwave_prob), 2)
        
    if score_value > 80:
        category = "Critical"
    elif score_value > 60:
        category = "High"
    elif score_value > 40:
        category = "Medium"
    else:
        category = "Low"
        
    return {
        "score_input": score_value,
        "risk_category": category
    }

