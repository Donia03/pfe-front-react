import React  from "react";
import demandeImage from '../images/dd.png'
import './DemandeClient.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function User() {

 

  return (
    <div className="demande">
      <div className="home">
        <h1 className="">Créer une demande </h1>
       
      </div>
      <div className="">
       
        <div className="demandeUpdate">
         
          <form  className="demandeUpdateForm">
            <div className="">
            
                <label className='form-label'>Titre de demande :</label>
                <input
                  name={""}
                  type="text"
                  placeholder=""
                  className="form-control"
           
                
                />
            
              <br/>
              <label className='form-label'>Référence :</label>
                <input
                  name={""}
                  type="text"
                  placeholder=""
                  className="form-control"
           
                
                />
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
<button type="submit" className="demandeUpdateButton">Envoyer Demande</button>
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
