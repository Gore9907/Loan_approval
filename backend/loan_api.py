from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

app = FastAPI()

preprocessor = joblib.load("preprocessor.joblib")
model = joblib.load("loan_xgb_model.pkl")

class LoanInput(BaseModel):
    no_of_dependents: int
    education: str
    self_employed: str
    income_annum: float
    loan_amount: float
    loan_term: int
    cibil_score: float
    residential_assets_value: float
    commercial_assets_value: float
    bank_asset_value: float

@app.post("/predict")
def predict(input: LoanInput):
    input_df = pd.DataFrame([input.dict()])
    
    processed_input = preprocessor.transform(input_df)

    prediction = model.predict(processed_input)[0]

    return {"prediction": "Approved" if prediction == 1 else "Rejected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("loan_api:app", host="0.0.0.0", port=8000)