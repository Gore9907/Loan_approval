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

  const raw = prediction?.prediction;
  const isApproved =
    (typeof raw === 'string' && raw.toLowerCase() === 'approved') ||
    (typeof raw === 'number' && raw === 1);
  const statusClass = raw ? (isApproved ? 'success' : 'error') : '';
  const statusText = raw ? (isApproved ? 'Approved' : 'Rejected') : '';

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4" />
                <path d="M5 21V10.85" />
                <path d="M19 21V10.85" />
                <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
              </svg>
            </div>
            <span className="logo-text">LoanCheck</span>
          </div>
          <div className="nav-badge">AI-Powered</div>
        </div>
      </nav>

      <main className="main">
        <div className="hero">
          <h1 className="hero-title">Loan Eligibility Check</h1>
          <p className="hero-sub">Get instant AI-powered loan approval predictions with 99.3% accuracy</p>
        </div>

        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-grid">
            {/* Left Column - Inputs */}
            <div className="form-sections">
              <fieldset className="section">
                <legend className="section-title">
                  <span className="section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  Personal Information
                </legend>
                <div className="fields-row">
                  <label className="field">
                    <span className="field-label">Dependents</span>
                    <input
                      className="field-input"
                      type="number"
                      name="no_of_dependents"
                      placeholder="0"
                      min={0}
                      value={formData.no_of_dependents}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="field">
                    <span className="field-label">Education</span>
                    <select
                      className="field-input"
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
                  <div className="field">
                    <span className="field-label">Self Employed</span>
                    <div className="toggle-group">
                      <label className={`toggle-option ${formData.self_employed === 'Yes' ? 'active' : ''}`}>
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
                      <label className={`toggle-option ${formData.self_employed === 'No' ? 'active' : ''}`}>
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
                  </div>
                </div>
              </fieldset>

              <fieldset className="section">
                <legend className="section-title">
                  <span className="section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </span>
                  Loan Details
                </legend>
                <div className="fields-row">
                  <label className="field">
                    <span className="field-label">Annual Income</span>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input
                        className="field-input has-prefix"
                        type="number"
                        name="income_annum"
                        placeholder="0"
                        min={0}
                        value={formData.income_annum}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </label>
                  <label className="field">
                    <span className="field-label">Loan Amount</span>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input
                        className="field-input has-prefix"
                        type="number"
                        name="loan_amount"
                        placeholder="0"
                        min={0}
                        value={formData.loan_amount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </label>
                </div>
                <div className="fields-row">
                  <label className="field">
                    <span className="field-label">Loan Term (years)</span>
                    <input
                      className="field-input"
                      type="number"
                      name="loan_term"
                      placeholder="1"
                      min={1}
                      value={formData.loan_term}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="field">
                    <span className="field-label">CIBIL Score</span>
                    <input
                      className="field-input"
                      type="number"
                      name="cibil_score"
                      placeholder="300 - 900"
                      min={0}
                      max={900}
                      value={formData.cibil_score}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="section">
                <legend className="section-title">
                  <span className="section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </span>
                  Assets
                </legend>
                <div className="fields-row">
                  <label className="field">
                    <span className="field-label">Residential</span>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input
                        className="field-input has-prefix"
                        type="number"
                        name="residential_assets_value"
                        placeholder="0"
                        min={0}
                        value={formData.residential_assets_value}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                  <label className="field">
                    <span className="field-label">Commercial</span>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input
                        className="field-input has-prefix"
                        type="number"
                        name="commercial_assets_value"
                        placeholder="0"
                        min={0}
                        value={formData.commercial_assets_value}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                  <label className="field">
                    <span className="field-label">Bank Assets</span>
                    <div className="input-with-prefix">
                      <span className="input-prefix">$</span>
                      <input
                        className="field-input has-prefix"
                        type="number"
                        name="bank_asset_value"
                        placeholder="0"
                        min={0}
                        value={formData.bank_asset_value}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Right Column - Result */}
            <div className="result-panel">
              <div className="result-card">
                <h2 className="result-heading">Prediction</h2>

                {!prediction && !loading && (
                  <div className="result-empty">
                    <div className="empty-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p>Fill out the form and submit to get your loan eligibility prediction.</p>
                  </div>
                )}

                {loading && (
                  <div className="result-loading">
                    <div className="spinner"></div>
                    <p>Analyzing your application...</p>
                  </div>
                )}

                {prediction && !loading && (
                  <div className={`result-badge ${statusClass}`}>
                    <div className="badge-icon">
                      {isApproved ? (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      ) : (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      )}
                    </div>
                    <span className="badge-text">{statusText}</span>
                    <span className="badge-sub">
                      {isApproved
                        ? 'Your loan application meets the approval criteria.'
                        : 'Your loan application does not meet the approval criteria.'}
                    </span>
                  </div>
                )}
              </div>

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Checking...
                  </>
                ) : (
                  'Check Eligibility'
                )}
              </button>

              <p className="disclaimer">
                Model accuracy: 99.3% — Results are predictions, not guarantees.
              </p>
            </div>
          </div>
        </form>
      </main>

      <footer className="footer">
        <p>Loan Approval Prediction Demo</p>
      </footer>
    </div>
  );
}

export default App;
