import React, { useState, useEffect } from "react";
import axios from "axios";
import clainImage from '../images/clain.png';
import "./Detail.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export default function Detail() {
  const params = useParams();
  const [reference, setReference] = useState("");
  const [objet, setObjet] = useState("");
  const [autreObjet, setAutreObjet] = useState("");
  const [preciser, setPreciser] = useState("");
  const [status, setStatus] = useState(0); // Default status is "En Cours"

  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  const userId = localStorage.getItem('id'); // Retrieve the token from local storage

  useEffect(() => {
    fetchReclamationData();
  }, []);

  const fetchReclamationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/reclamation/${params.reclamationId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      const data = response.data;
      setReference(data.ref);
      setObjet(data.objet);
      setPreciser(data.preciser);
      setStatus(data.status);
    } catch (error) {
      console.error("Error fetching reclamation data:", error);
    }
  };

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

  const statusChangeHandler = (event) => {
    setStatus(parseInt(event.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReclamation = {
      ref: reference,
      objet: objet,
      preciser: preciser,
      status: status,
    };

    try {
      const response = await axios.put(
        `http://localhost:8082/api/reclamation/${params.reclamationId}/${userId}`,
        updatedReclamation,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      // Handle the response, e.g., show success message, redirect, etc.
      console.log("Reclamation updated:", response.data);
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Error updating reclamation:", error);
    }
  };

  return (
    <div className="reclamation">
      <div className="home">
        <h1 className="">Traiter une réclamation</h1>
      </div>
      <div className="reclamationContainer">
        <div className="reclamationUpdate">
          <form onSubmit={handleSubmit} className="reclamationUpdateForm">
            <div className="">
              <label className='form-label'>Référence :</label>
              <input
              disabled 
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
                disabled 
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
                disabled 
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
                disabled 
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
                  disabled 
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
                disabled 
                  rows={6}
                  placeholder=""
                  className="form-control"
                  value={preciser}
                  onChange={preciserChangeHandler}
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
                <button type="submit" className="reclamationUpdateButton">
                  Modifier
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
