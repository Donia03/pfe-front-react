import React, { useState } from 'react';
import axios from 'axios';
import './import.css'; // Import the CSS file

const Import = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

    const closeSuccessMessage = () => {
      setSuccessMessage("");
    };

    const [errorMessage, setErrorMessage] = useState("");

    const clearErrorMessage = () => {
      setErrorMessage("");
    };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8082/api/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(response.data);
      setFile(null);
      setSuccessMessage("New file has been saved");
    } catch (error) {
      console.error('Error:', error);
       setErrorMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user">
     {successMessage && (
          <div className="success-message">
            {successMessage}
            <span className="close-icon" onClick={closeSuccessMessage}>
              &#x2715;
            </span>
          </div>
        )}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
            <span className="close-icon" onClick={clearErrorMessage}>
              &#x2715;
            </span>
          </div>
        )}
          <div className="userTitleContainer">
            <h1 className="userTitle">Import Data</h1>
          </div>
          <div className="passwordChange">

            <div className="import-component">

                  <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                  <button className="import-button" onClick={handleUpload} disabled={loading}>
                    Save
                  </button>
                  {loading && <div className="loading">Loading...</div>}
                </div>

          </div>

        </div>
  );
};

export default Import;
