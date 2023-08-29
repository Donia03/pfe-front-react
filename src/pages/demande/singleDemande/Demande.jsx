import React, { useState, useEffect } from "react";
import axios from "axios";
import demandeImage from '../../images/dd.png';
import './Demande.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export default function SingleDemande() {
  const params = useParams();
  const [titre, setTitre] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0); // Default status is "En Cours"

  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    fetchDemandeData();
  }, []);

  const fetchDemandeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/demande/${params.demandeId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      const data = response.data;
      setTitre(data.titre);
      setReference(data.reference);
      setDescription(data.description);
      setStatus(data.status);
    } catch (error) {
      console.error("Error fetching demande data:", error);
    }
  };

  const titreChangeHandler = (event) => {
    setTitre(event.target.value);
  };

  const referenceChangeHandler = (event) => {
    setReference(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(parseInt(event.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDemande = {
      titre: titre,
      reference: reference,
      description: description,
      status: status,
    };

    try {
      const response = await axios.put(
        `http://localhost:8082/api/demande/${params.demandeId}`,
        updatedDemande,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      // Handle the response, e.g., show success message, redirect, etc.
      console.log("Demande updated:", response.data);
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Error updating demande:", error);
    }
  };

  return (
    <div className="demande">
      <div className="home">
        <h1 className="">Modifier une demande</h1>
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
                <label className='form-label'>Statut :</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={statusChangeHandler}
                >
                  <option value={0}>En Cours</option>
                  <option value={1}>Valider</option>
                  <option value={2}>Refuser</option>
                </select>

                <br/>
                <button type="submit" className="demandeUpdateButton">
                  Modifier Demande
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
