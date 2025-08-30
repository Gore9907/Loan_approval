import { useState } from 'react'
import './index.css'
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
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    try {
      const response = await axios.post(
        'https://loan-approval-api-sfye.onrender.com/predict',
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      console.error("API error:", err);
      alert("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  // Normalize status → Approved/Rejected
  const raw = prediction?.prediction;
  const isApproved =
    (typeof raw === 'string' && raw.toLowerCase() === 'approved') ||
    (typeof raw === 'number' && raw === 1);
  const statusClass = raw ? (isApproved ? 'success' : 'error') : '';
  const statusText = raw ? (isApproved ? 'Approved' : 'Rejected') : '';

  return (
    <>
      <div className="header">
        <div className="header-wrap">
          <div className="brand">Loan Approval Demo</div>
        </div>
      </div>

      <div className="page">
        <div className="grid">
          <section className="card">
            <h2 className="h2">Borrower details</h2>
            <p className="sub">Enter details to check approval status.</p>

            <form onSubmit={handleSubmit} className="form form--plain">
              <label className="form-label">
                <span className="label-text">No. of Dependents</span>
                <input
                  className="input"
                  type="number"
                  name="no_of_dependents"
                  min={0}
                  value={formData.no_of_dependents}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-label">
                <span className="label-text">Education</span>
                <select
                  className="select"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Not Graduate">Not Graduate</option>
                </select>
              </label>

              <label className="form-label">
                <span className="label-text">Self Employed</span>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="self_employed"
                      value="Yes"
                      checked={formData.self_employed === 'Yes'}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="self_employed"
                      value="No"
                      checked={formData.self_employed === 'No'}
                      onChange={handleChange}
                      required
                    />
                    No
                  </label>
                </div>
              </label>

              <label className="form-label">
                <span className="label-text">Annual Income</span>
                <input
                  className="input"
                  type="number"
                  name="income_annum"
                  min={0}
                  value={formData.income_annum}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-label">
                <span className="label-text">Loan Amount</span>
                <input
                  className="input"
                  type="number"
                  name="loan_amount"
                  min={0}
                  value={formData.loan_amount}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-label">
                <span className="label-text">Loan Term (years)</span>
                <input
                  className="input"
                  type="number"
                  name="loan_term"
                  min={1}
                  value={formData.loan_term}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-label">
                <span className="label-text">Credit Score</span>
                <input
                  className="input"
                  type="number"
                  name="cibil_score"
                  min={0}
                  max={900}
                  value={formData.cibil_score}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-label">
                <span className="label-text">Residential Assets</span>
                <input
                  className="input"
                  type="number"
                  name="residential_assets_value"
                  min={0}
                  value={formData.residential_assets_value}
                  onChange={handleChange}
                />
              </label>

              <label className="form-label">
                <span className="label-text">Commercial Assets</span>
                <input
                  className="input"
                  type="number"
                  name="commercial_assets_value"
                  min={0}
                  value={formData.commercial_assets_value}
                  onChange={handleChange}
                />
              </label>

              <label className="form-label">
                <span className="label-text">Bank Assets</span>
                <input
                  className="input"
                  type="number"
                  name="bank_asset_value"
                  min={0}
                  value={formData.bank_asset_value}
                  onChange={handleChange}
                />
              </label>

              <div className="button-container">
                <button className="button" type="submit" disabled={loading}>
                  {loading ? "Checking..." : "Check eligibility"}
                </button>
              </div>
            </form>
          </section>

          <section className="card">
            <h2 className="h2">Result</h2>

            {!prediction && !loading && (
              <p className="sub">Submit the form to see approval status.</p>
            )}

            {loading && (
              <div className="skel">
                <div className="bar"></div>
                <div className="box"></div>
              </div>
            )}

            {prediction && !loading && (
              <div className={`callout ${statusClass}`}>
                {statusText}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
