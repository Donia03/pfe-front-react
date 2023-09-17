import React, { useState } from 'react';
import axios from 'axios';
import './import.css'; // Import the CSS file

const Import = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

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
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user">
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
                  {response && <div>Response: {JSON.stringify(response)}</div>}
                </div>

          </div>

        </div>
  );
};

export default Import;
