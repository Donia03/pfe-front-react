import React, { useState } from 'react';
import axios from 'axios';
import './import.css'; // Import the CSS file

const Import = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
  };/*prend 1 files men element target dans navigateur*/

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);/*objet en forme fomulaire utilise formedata*/

      const response = await axios.post('http://localhost:8082/api/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


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
          <div className="userList">
          <div className="titreClient">
            <h1 className="titre">Importer les Données</h1>
          </div>
            </div>
              <br/>    <br/>    <br/>    <br/>
          <div className="userUpdate">

            <div className="userUpdate">
                   <br/>    <br/>
                   <center>
                   <strong>Importer un fichier Excel dans le système pour analyser les données :</strong><br/><br/>
                   </center>
                   <center>

                  <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} /><br/>    <br/>    <br/>
                  <button className="tag3" onClick={handleUpload} disabled={loading}>
                    Importer
                  </button>
                  {loading && <div className="loading">Loading...</div>}
                  </center>
                </div>

          </div>

        </div>
  );
};

export default Import;
