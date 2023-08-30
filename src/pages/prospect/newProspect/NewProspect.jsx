import "./NewProspect.css";
import {useEffect, useState} from "react";
import axios from "axios"

export default function NewProspect() {
  const [email, setEmail] = useState("")
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [password, setPassword] = useState("")
   const [cin, setCin] = useState("")
    const [telephone, setTelephone] = useState("")
    const [role, setRole] = useState("Prospect")
    const [image, setImage] = useState(null);

const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }
  const nomChangeHandler = (event) => {
    setNom(event.target.value)
  }
  const prenomChangeHandler = (event) => {
    setPrenom(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }
const cinChangeHandler = (event) => {
    setCin(event.target.value)
  }
 const telephoneChangeHandler = (event) => {
     setTelephone(event.target.value)
   }
 const selectHandler = (event) => {
    setRole(event.target.value)
    console.log(role)
 }

 const imageChangeHandler = (event) => {
         setImage(event.target.files[0]); // Store the selected image in the state
     };

  const handleSubmit = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("nom", nom);
          formData.append("prenom", prenom);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("cin", cin);
          formData.append("telephone", telephone);
          formData.append("role", role);
          formData.append("image", image); // Append the image to the FormData

          try {
              // Retrieve the token from local storage
              const token = localStorage.getItem('token');

              const response = await axios.post("http://localhost:8082/api/user", formData, {
                  headers: {
                      "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for image upload
                      "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
                  },
              });

              // Handle the response, e.g., show success message, redirect, etc.
              console.log("User created:", response.data);

              // Reset the form fields and selected image after successful submission
              setEmail("");
              setPassword("");
              setPrenom("");
              setNom("");
              setCin("");
              setTelephone("");
              setRole("");
              setImage(null);
          } catch (error) {
              // Handle error, e.g., show error message
              console.error("Error creating user:", error);
          }
      };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Prospect</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Nom</label>
          <input
              type="text"
              placeholder="Nom..."
              name="nom"
              onChange={nomChangeHandler}
              value={nom}
          />
        </div>
        <div className="newUserItem">
          <label>Prenom</label>
          <input
              type="text"
              placeholder="Prenom..."
              name="prenom"
              onChange={prenomChangeHandler}
              value={prenom}
          />
        </div>
         <div className="newUserItem">
                  <label>Cin</label>
                  <input
                      type="text"
                      placeholder="Cin"
                      name="cin"
                      onChange={cinChangeHandler}
                      value={cin}
                  />
                  </div>
                   <div className="newUserItem">
                            <label>Telephone</label>
                            <input
                                type="text"
                                placeholder="Telephone"
                                name="telephone"
                                onChange={telephoneChangeHandler}
                                value={telephone}
                            />
                            </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              onChange={emailChangeHandler}
              value={email}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
              type="password"
              placeholder="password"
              name="password"
              onChange={passwordChangeHandler}
              value={password}
          />
          </div>

          <div className="newUserItem">
             <label>Image</label>
             <input type="file" accept="image/*" onChange={imageChangeHandler} />
          </div>

        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
  );
}
