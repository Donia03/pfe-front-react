import React, { useState } from "react";
import axios from "axios";
import demandeImage from '../../images/dd.png';
import './DemandeClient.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNotification } from '../../../context/NotificationContext';

export default function DemandeClient() {
  const [titre, setTitre] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const { notifChange, setNotifChange } = useNotification();

  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  const userId = localStorage.getItem('id'); // Retrieve the token from local storage

  const titreChangeHandler = (event) => {
    setTitre(event.target.value);
  };

  const referenceChangeHandler = (event) => {
    setReference(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDemande = {
      titre: titre,
      reference: reference,
      description: description,
    };

    try {
      const response = await axios.post(`http://localhost:8082/api/demande/${userId}`
      , newDemande, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Handle the response, e.g., show success message, redirect, etc.
      console.log("Demande created:", response.data);
      setNotifChange(true);
      console.log("notifChange set to true", notifChange);

      // Reset the form fields after successful submission
      setTitre("");
      setReference("");
      setDescription("");
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Error creating demande:", error);
    }
  };

  return (
    <div className="demande">
      <div className="home">
        <h1 className="">Créer une demande</h1>
      </div>
      <div className="">
        <div className="demandeUpdate">
          <form onSubmit={handleSubmit} className="demandeUpdateForm">
            <div className="">
              <label className='form-label'>Titre de demande :</label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={titre}
                onChange={titreChangeHandler}
              />

              <br/>
              <label className='form-label'>Référence :</label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                value={reference}
                onChange={referenceChangeHandler}
              />

              <br/>
              <div className="">
                <label className='form-label'>Préciser :</label>
                <textarea
                  rows={10}
                  placeholder=""
                  className="form-control"
                  value={description}
                  onChange={descriptionChangeHandler}
                />

                <br/>
                <button type="submit" className="demandeUpdateButton">
                  Envoyer Demande
                </button>
              </div>
            </div>
            <div className="UpdateRight">
              <div className="UpdateUpload">
                <img
                  className="demandeUpdateImg"
                  src={demandeImage}
                  alt="Demande"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
