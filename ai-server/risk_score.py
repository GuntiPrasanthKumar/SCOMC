def calculate_risk_score(score_value: float) -> dict:
    """
    Mock implementation for Climate Risk Score API.
    """
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
