# ClimateTwinAI - AI Prediction & Climate Intelligence Module
**Assignee:** CHAPPA BHARATH KUMAR
**Role:** AI / ML Developer
**Phase:** Phase 1

## 1. Project Overview
This is the AI Prediction module that powers the ClimateTwinAI platform (part of SCOMC). This module analyzes climate inputs, estimates climate risks, generates predictions, and provides intelligent recommendations for disaster preparedness. For Phase 1, it utilizes **mock datasets** to simulate these outputs.

## 2. Folder Structure
```
ai-server/
├── api.py                      # Main FastAPI server entry point
├── requirements.txt            # Python dependencies (FastAPI, Uvicorn, etc.)
├── flood_prediction.py         # Logic for flood probability calculation
├── heatwave_prediction.py      # Logic for heatwave risk estimation
├── risk_score.py               # Evaluates total climate risk scores
├── recommendation_engine.py    # Generates disaster response recommendations
├── config.py                   # App configuration variables
├── utils.py                    # Helper and formatting functions
├── datasets/                   # Mock CSV/JSON datasets (Do NOT use external APIs)
└── models/                     # Placeholder for future ML models
```

## 3. Prerequisites
- Python 3.9+
- pip
- Virtual Environment

## 4. Installation
```bash
# Navigate to this folder
cd ai-server

# Create Virtual Environment
python -m venv venv

# Activate Virtual Environment
# (Windows)
venv\Scripts\activate
# (Mac/Linux)
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

## 5. Run Project
Command to start the FastAPI server:
```bash
uvicorn api:app --reload
```
Once running, you can access the interactive API docs at `http://127.0.0.1:8000/docs`.

## 6. API Documentation

### 6.1. Flood Prediction API
- **Endpoint:** `GET /prediction/flood`
- **Inputs:** `rainfall`, `river_level`, `humidity`
- **Output:** Flood Probability, Risk Level, Recommendation

### 6.2. Heatwave Prediction API
- **Endpoint:** `GET /prediction/heatwave`
- **Inputs:** `temperature`, `humidity`
- **Output:** Heatwave Risk, Warning, Recommendation

### 6.3. Climate Risk Score API
- **Endpoint:** `GET /prediction/risk-score`
- **Output:** Low, Medium, High, or Critical

### 6.4. Climate Analysis API
- **Endpoint:** `POST /prediction/analyze`
- **Input:** JSON Payload (rainfall, river_level, temperature, humidity)
- **Output:** Combined Risk Analysis & Recommendations

## 7. Git Workflow
You are working on the `bharath-dev` branch. **Never push directly to `develop` or `main`.**

```bash
# 1. Clone repository (if you haven't already)
git clone <repo_url>

# 2. Checkout your assigned branch
git checkout bharath-dev

# 3. Pull latest develop changes (regularly)
git pull origin develop

# 4. Commit your work
git add .
git commit -m "Added Flood Prediction API"

# 5. Push
git push origin bharath-dev

# 6. Create Pull Request on GitHub to merge `bharath-dev` into `develop`
```

## 8. Coding Standards
- Use proper naming (snake_case for variables/functions).
- Write reusable functions.
- Comment important logic.
- Follow PEP8 standard.

## 9. Commit Message Convention
Examples of good commit messages:
- `feat: Added Flood Prediction API`
- `feat: Added Heatwave Prediction`
- `feat: Implemented Recommendation Engine`
- `chore: Updated Mock Dataset`

## 10. Daily Workflow
`Start work` ↓ `Pull latest changes` ↓ `Develop feature` ↓ `Commit` ↓ `Push` ↓ `Create Pull Request`

---
> [!IMPORTANT]
> **Boundary Rules for Bharath**:
> 1. You should only work inside the `ai-server/` directory.
> 2. NEVER modify `frontend/` or `backend/` unless instructed by the Team Lead.
> 3. ONLY push to `bharath-dev`.
> 4. ALL changes must be merged through Pull Requests into `develop`.
> 5. NEVER merge directly into `main`.

<!-- Co-author verification comment -->
