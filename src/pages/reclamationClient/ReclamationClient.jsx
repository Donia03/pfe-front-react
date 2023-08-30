import React, { useState } from "react";
import axios from "axios";
import clainImage from '../images/clain.png'
import './ReclamationClient.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReclamationClient() {
  const [reference, setReference] = useState("");
  const [objet, setObjet] = useState("");
  const [autreObjet, setAutreObjet] = useState("");
  const [preciser, setPreciser] = useState("");

  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  const userId = localStorage.getItem('id');

  const referenceChangeHandler = (event) => {
    setReference(event.target.value);
  };

  const objetChangeHandler = (event) => {
    setObjet(event.target.value);
  };

  const autreObjetChangeHandler = (event) => {
    setAutreObjet(event.target.value);
  };

  const preciserChangeHandler = (event) => {
    setPreciser(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the user's ID from localStorage
    const userId = localStorage.getItem('id');
    console.log(userId)
    const selectedObjet = autreObjet ? autreObjet : objet;

    const reclamationData = {
      userId: userId,
      reference: reference,
      objet: selectedObjet,
      preciser: preciser,
    };

    try {
      const response = await axios.post(
        `http://localhost:8082/api/reclamation/${userId}`,
        reclamationData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      // Handle the response, e.g., show success message, redirect, etc.
      console.log("Reclamation submitted:", response.data);
      setReference("");
          setObjet("");
          setAutreObjet("");
          setPreciser("");
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Error submitting reclamation:", error);
    }
  };

  return (
    <div className="reclamation">
      <div className="home">
        <h1 className="">Créer une réclamation</h1>
      </div>
      <div className="reclamationContainer">
        <div className="reclamationUpdate">
          <form onSubmit={handleSubmit} className="reclamationUpdateForm">
            <div className="">
              <label className='form-label'>Référence :</label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={reference}
                onChange={referenceChangeHandler}
              />
              <br/>
              <label className='form-label'>Objet de la réclamation :</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Problème de service"
                  id="objetProbleme"
                  checked={objet === "Problème de service"}
                  onChange={objetChangeHandler}
                />
                <label className="form-check-label" htmlFor="objetProbleme">
                  Problème de service
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Facture non reçue"
                  id="objetFacture"
                  checked={objet === "Facture non reçue"}
                  onChange={objetChangeHandler}
                />
                <label className="form-check-label" htmlFor="objetFacture">
                  Facture non reçue
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Autres"
                  id="objetAutres"
                  checked={objet === "Autres"}
                  onChange={objetChangeHandler}
                />
                <label className="form-check-label" htmlFor="objetAutres">
                  Autres
                </label>
                {objet === "Autres" && (
                  <input
                    type="text"
                    placeholder="Précisez l'objet"
                    className="form-control"
                    value={autreObjet}
                    onChange={autreObjetChangeHandler}
                  />
                )}
              </div>
              <br/>
              <div className="">
                <label className='form-label'>Préciser :</label>
                <textarea
                  rows={10}
                  placeholder=""
                  className="form-control"
                  value={preciser}
                  onChange={preciserChangeHandler}
                />
                <br/>
                <button type="submit" className="reclamationUpdateButton">
                  Envoyer
                </button>
              </div>
            </div>
            <div className="reclamationUpdateRight">
              <div className="reclamationUpdateUpload">
                <img
                  className="reclamationUpdateImg"
                  src={clainImage}
                  alt="Clain"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
