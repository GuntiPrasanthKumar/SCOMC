import os
import pandas as pd
from typing import Optional

DATASETS_DIR = os.path.join(os.path.dirname(__file__), "datasets")

def format_response(data: dict, status: str = "success") -> dict:
    """
    Standardize API responses.
    """
    return {
        "status": status,
        "data": data
    }

def load_dataset(filename: str) -> pd.DataFrame:
    """
    Safely load a dataset CSV file.
    """
    filepath = os.path.join(DATASETS_DIR, filename)
    if not os.path.exists(filepath):
        return pd.DataFrame()
    try:
        return pd.read_csv(filepath)
    except Exception:
        return pd.DataFrame()

def get_rainfall_data(date: Optional[str] = None, location: Optional[str] = None) -> float:
    """
    Retrieve rainfall (mm) for a specific date and location, defaulting to the latest record.
    """
    df = load_dataset("rainfall.csv")
    if df.empty:
        return 0.0
    
    # Filter by location first if specified
    if location:
        df_loc = df[df["location"].str.lower() == location.lower()]
        if not df_loc.empty:
            df = df_loc

    # Filter by date if specified
    if date:
        df_date = df[df["date"] == date]
        if not df_date.empty:
            df = df_date

    if not df.empty:
        # Sort by date to get the latest if there are multiple
        df = df.sort_values(by="date")
        return float(df.iloc[-1]["rainfall_mm"])
    return 0.0

def get_temperature_data(date: Optional[str] = None, location: Optional[str] = None) -> float:
    """
    Retrieve temperature (C) for a specific date and location, defaulting to the latest record.
    """
    df = load_dataset("temperature.csv")
    if df.empty:
        return 0.0
    
    if location:
        df_loc = df[df["location"].str.lower() == location.lower()]
        if not df_loc.empty:
            df = df_loc

    if date:
        df_date = df[df["date"] == date]
        if not df_date.empty:
            df = df_date

    if not df.empty:
        df = df.sort_values(by="date")
        return float(df.iloc[-1]["temperature_c"])
    return 0.0

def get_humidity_data(date: Optional[str] = None, location: Optional[str] = None) -> float:
    """
    Retrieve humidity (%) for a specific date and location, defaulting to the latest record.
    """
    df = load_dataset("humidity.csv")
    if df.empty:
        return 0.0
    
    if location:
        df_loc = df[df["location"].str.lower() == location.lower()]
        if not df_loc.empty:
            df = df_loc

    if date:
        df_date = df[df["date"] == date]
        if not df_date.empty:
            df = df_date

    if not df.empty:
        df = df.sort_values(by="date")
        return float(df.iloc[-1]["humidity_pct"])
    return 0.0

def get_river_level_data(date: Optional[str] = None, river: Optional[str] = None) -> float:
    """
    Retrieve river level (m) for a specific date and river location, defaulting to the latest record.
    """
    df = load_dataset("river_level.csv")
    if df.empty:
        return 0.0
    
    if river:
        df_loc = df[df["location"].str.lower() == river.lower()]
        if not df_loc.empty:
            df = df_loc

    if date:
        df_date = df[df["date"] == date]
        if not df_date.empty:
            df = df_date

    if not df.empty:
        df = df.sort_values(by="date")
        return float(df.iloc[-1]["river_level_m"])
    return 0.0

