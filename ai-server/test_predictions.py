import sys
import os

# Add current folder to path
sys.path.append(os.path.dirname(__file__))

from utils import get_rainfall_data, get_temperature_data, get_humidity_data, get_river_level_data
from flood_prediction import predict_flood
from heatwave_prediction import predict_heatwave
from risk_score import calculate_risk_score

def test_data_loading():
    print("--- Testing Data Loading ---")
    
    # Test specific values from datasets:
    # rainfall.csv: 
    # 2026-07-01,120.5,Zone A
    # 2026-07-02,45.2,Zone B
    rain_a = get_rainfall_data(date="2026-07-01", location="Zone A")
    rain_b = get_rainfall_data(date="2026-07-02", location="Zone B")
    rain_latest = get_rainfall_data()
    
    print(f"Rainfall (Zone A, 2026-07-01): {rain_a} (Expected: 120.5)")
    print(f"Rainfall (Zone B, 2026-07-02): {rain_b} (Expected: 45.2)")
    print(f"Latest Rainfall (Default): {rain_latest} (Expected: 45.2 or 120.5)")
    
    assert rain_a == 120.5
    assert rain_b == 45.2
    
    # temperature.csv: 
    # 2026-07-01,38.5,Zone A
    # 2026-07-02,42.1,Zone B
    temp_a = get_temperature_data(date="2026-07-01", location="Zone A")
    temp_b = get_temperature_data(date="2026-07-02", location="Zone B")
    
    print(f"Temp (Zone A, 2026-07-01): {temp_a} (Expected: 38.5)")
    print(f"Temp (Zone B, 2026-07-02): {temp_b} (Expected: 42.1)")
    
    assert temp_a == 38.5
    assert temp_b == 42.1
    
    # river_level.csv:
    # 2026-07-01,4.5,Godavari
    # 2026-07-02,3.8,Godavari
    river_1 = get_river_level_data(date="2026-07-01", river="Godavari")
    river_2 = get_river_level_data(date="2026-07-02", river="Godavari")
    
    print(f"River Level (Godavari, 2026-07-01): {river_1} (Expected: 4.5)")
    print(f"River Level (Godavari, 2026-07-02): {river_2} (Expected: 3.8)")
    
    assert river_1 == 4.5
    assert river_2 == 3.8
    print("Data loading tests passed!\n")

def test_flood_prediction():
    print("--- Testing Flood Prediction ---")
    
    # Explicit inputs
    res_explicit = predict_flood(rainfall=100.0, river_level=4.0, humidity=80.0)
    print(f"Explicit prediction: {res_explicit}")
    # rain: 100/150*50 = 33.33
    # river: 4/6*40 = 26.67
    # humidity: 80/100*10 = 8.0
    # total = 68.0 -> High risk
    assert res_explicit["risk_level"] == "High"
    assert res_explicit["risk_probability"] == 68.0
    
    # Omitted inputs (Zone A, 2026-07-01)
    # rain: 120.5 (120.5/150*50 = 40.17)
    # river: 4.5 (4.5/6*40 = 30.0)
    # humidity: 85.5 (85.5/100*10 = 8.55)
    # total = 78.72 -> High risk
    res_dataset = predict_flood(date="2026-07-01", location="Zone A")
    print(f"Dataset-based prediction (Zone A, 2026-07-01): {res_dataset}")
    assert res_dataset["risk_level"] == "High"
    assert res_dataset["risk_probability"] == 78.72
    print("Flood prediction tests passed!\n")

def test_heatwave_prediction():
    print("--- Testing Heatwave Prediction ---")
    
    # Explicit inputs
    res_explicit = predict_heatwave(temperature=42.0, humidity=60.0)
    print(f"Explicit heatwave prediction: {res_explicit}")
    # temperature > 40.0 -> Critical risk
    assert res_explicit["heatwave_risk"] == "Critical"
    
    # Omitted inputs (Zone B, 2026-07-02)
    # temp: 42.1 -> Critical
    res_dataset = predict_heatwave(date="2026-07-02", location="Zone B")
    print(f"Dataset-based heatwave prediction (Zone B, 2026-07-02): {res_dataset}")
    assert res_dataset["heatwave_risk"] == "Critical"
    print("Heatwave prediction tests passed!\n")

def test_risk_score():
    print("--- Testing Risk Score ---")
    
    # Explicit inputs
    res_explicit = calculate_risk_score(score_value=85.0)
    print(f"Explicit risk score: {res_explicit}")
    assert res_explicit["risk_category"] == "Critical"
    
    # Dataset-based calculation (Zone A, 2026-07-01)
    res_dataset = calculate_risk_score(date="2026-07-01", location="Zone A")
    print(f"Dataset-based risk score (Zone A, 2026-07-01): {res_dataset}")
    # flood prob was 78.72 (High)
    assert res_dataset["risk_category"] == "High"
    print("Risk score tests passed!\n")

if __name__ == "__main__":
    try:
        test_data_loading()
        test_flood_prediction()
        test_heatwave_prediction()
        test_risk_score()
        print("ALL TESTS PASSED SUCCESSFULLY!")
    except AssertionError as e:
        print(f"Assertion failed: {e}")
        sys.exit(1)
