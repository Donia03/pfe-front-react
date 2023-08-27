import React  from "react";
import clainImage from '../images/clain.png'
import './ReclamationClient.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function User() {

 

  return (
    <div className="reclamation">
      <div className="home">
        <h1 className="">Créer une réclamation </h1>
       
      </div>
      <div className="reclamationContainer">
       
        <div className="reclamationUpdate">
         
          <form  className="reclamationUpdateForm">
            <div className="">
            
                <label className='form-label'>Référence :</label>
                <input
                  name={""}
                  type="text"
                  placeholder=""
                  className="form-control"
           
                
                />
            
              <br/>
              <label className='form-label'>Objet de la réclamation :</label>
              <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label" for="flexCheckDefault">
    Probléme de service
  </label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label" for="flexCheckDefault">
    Facture non récue
  </label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label" for="flexCheckDefault">
    Autres
  </label>
</div>
<br/>
              <div className="">
                <label className='form-label'>préciser :</label>
                <textarea rows={10} 
                  type="text"
                  placeholder=""
                  className="form-control"
                  name={"prenom"}
                  
                />
<br/>
<button type="submit" className="reclamationUpdateButton">Envoyer</button>
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
