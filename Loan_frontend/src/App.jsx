import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [formData, setFormdata] = useState({
    no_of_dependents: '',
    education: '',
    self_employed: '',
    income_annum: '',
    loan_amount: '',
    loan_term: '',
    cibil_score: '',
    residential_assets_value: '',
    commercial_assets_value: '',
    bank_asset_value: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://loan-approval-api-sfye.onrender.com/predict', formData);
      setPrediction(response.data);
      setLoading(false);
    } catch (err) {
      console.error("API error:", err);
      setLoading(false);
      alert("Failed to fetch prediction.");
    }
  };
  return (
    <>
    <h1>Loan Approval</h1>
    <form className='form'onSubmit={handleSubmit}>
      <label className="form-label">
        No of Dependents:
        <input
          type="number"
          name="no_of_dependents"
          min={0}
          value={formData.no_of_dependents}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Education:
        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Graduate">Graduate</option>
          <option value="Not Graduate">Not Graduate</option>
        </select>
      </label>

      <label className="form-label">
        Self Employed:
        <div className="radio-group">
        <label className="radio-label">
          Yes
          <input
            type="radio"
            name="self_employed"
            value="Yes"
            checked={formData.self_employed === 'Yes'}
            onChange={handleChange}
          />
        </label>
        <label className="radio-label">
          No
          <input
            type="radio"
            name="self_employed"
            value="No"
            checked={formData.self_employed === 'No'}
            onChange={handleChange}
          /> 
        </label>
        </div>
      </label>

      <label className="form-label">
        <span>Annual Income</span>
        <input
          type="number"
          name="income_annum"
          min={0}
          value={formData.income_annum}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Loan Amount:
        <input
          type="number"
          name="loan_amount"
          min={0}
          value={formData.loan_amount}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Loan Term (in years):
        <input
          type="number"
          name="loan_term"
          min={1}
          value={formData.loan_term}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Credit Score:
        <input
          type="number"
          name="cibil_score"
          min={0}
          max={900}
          value={formData.cibil_score}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Residential Assets Value:
        <input
          type="number"
          name="residential_assets_value"
          min={0}
          value={formData.residential_assets_value}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Commercial Assets Value :
        <input
          type="number"
          name="commercial_assets_value"
          min={0}
          value={formData.commercial_assets_value}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Bank Assets Value :
        <input
          type="number"
          name="bank_asset_value"
          min={0}
          value={formData.bank_asset_value}
          onChange={handleChange}
        />
      </label>
      <div className="button-container">
        <button className='button' type="submit">Submit</button>
      </div>
      {prediction && (
      <div>
        Loan Status: {loading?<strong>Loading</strong>:<strong>{prediction.prediction}</strong>}
      </div>
      )}
    </form>
    </>
  )
}

export default App
