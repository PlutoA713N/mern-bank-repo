import React, { useState } from 'react';
import axios from 'axios';
import './AccountForm.css';

const AccountForm = () => {
  const [accountId, setAccountId] = useState('');
  const [introducerId, setIntroducerId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountIdError, setAccountIdError] = useState('');
  const [introducerIdError, setIntroducerIdError] = useState('');

  const handleAccountIdChange = (e) => {
    setAccountId(e.target.value);
    setAccountIdError('');
  };

  const handleIntroducerIdChange = (e) => {
    setIntroducerId(e.target.value);
    setIntroducerIdError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL;

    let hasErrors = false;

    if (!accountId) {
      setAccountIdError("Account ID is required.");
      hasErrors = true;
    } else if (/[^0-9]/.test(accountId)) {
      setAccountIdError("Only numbers are allowed in Account ID.");
      hasErrors = true;
    }

    if (!introducerId) {
      setIntroducerIdError("Introducer ID is required.");
      hasErrors = true;
    } else if (/[^0-9]/.test(introducerId)) {
      setIntroducerIdError("Only numbers are allowed in Introducer ID.");
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${apiUrl}/api/beneficiary`, { accountId, introducerId }); 
      console.log({ response });
      setAccountId('');
      setIntroducerId('');
    } catch (error) {
      console.error('Error submitting:', error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="account-form-container">
      <div className="form-group">
        <label htmlFor="accountId" className="form-label">Account ID:</label>
        <input
          type="text"
          value={accountId}
          onChange={handleAccountIdChange}
          required
          id="accountId"
          className="form-input"
          placeholder="Enter numeric Account ID"
        />
        {accountIdError && <div className="error-message red-text">{accountIdError}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="introducerId" className="form-label">Introducer ID:</label>
        <input
          type="text"
          value={introducerId}
          onChange={handleIntroducerIdChange}
          required
          id="introducerId"
          className="form-input"
          placeholder="Enter numeric Introducer ID"
        />
        {introducerIdError && <div className="error-message red-text">{introducerIdError}</div>}
      </div>
      <button type="submit" className={`form-submit-button ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AccountForm;