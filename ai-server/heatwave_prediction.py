def predict_heatwave(temperature: float, humidity: float) -> dict:
    """
    Mock implementation for Heatwave Prediction API.
    """
    # Simple mock logic
    heat_index = temperature + (0.5 * humidity)
    
    if heat_index > 85:
        risk = "Critical"
        warning = "Extreme Heatwave Alert!"
    elif heat_index > 70:
        risk = "High"
        warning = "Heatwave Warning"
    else:
        risk = "Normal"
        warning = "No immediate danger"
        
    return {
        "heatwave_risk": risk,
        "warning": warning,
        "recommendation": "Open Relief Centers" if risk in ["High", "Critical"] else "Normal Operations"
    }
