import React, { useState, useRef } from "react";
import axios from "axios";
import "./newClient.css";

export default function NewUser() {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [cin, setCin] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("Client");
  const [image, setImage] = useState(null);
  const userId = localStorage.getItem('id');

  const [emailError, setEmailError] = useState("");
  const [prenomError, setPrenomError] = useState("");
  const [nomError, setNomError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cinError, setCinError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [imageError, setImageError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const [errorMessage, setErrorMessage] = useState("");

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

    const fileInputRef = useRef(null);


  const validateInputs = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
           setEmailError("Invalid email format");
           isValid = false;
    }else {
      setEmailError("");
    }

    if (prenom.trim() === "") {
      setPrenomError("Prenom is required");
      isValid = false;
    } else {
      setPrenomError("");
    }

    if (nom.trim() === "") {
      setNomError("Nom is required");
      isValid = false;
    } else {
      setNomError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }else if (password.trim().length < 6) {
           setPasswordError("Password should be at least 6 characters");
           isValid = false;
         }
     else {
      setPasswordError("");
    }

    if (cin.trim() === "") {
      setCinError("Cin is required");
      isValid = false;
      }else if (!/^\d{8}$/.test(cin)) {
          setCinError("Cin must have 8 numeric characters");
          isValid = false;
    } else {
      setCinError("");
    }

    if (telephone.trim() === "") {
      setTelephoneError("Telephone is required");
      isValid = false;
      }else if (!/^\d{8}$/.test(telephone)) {
                setTelephoneError("Telephone must have 8 numeric characters");
                isValid = false;
    } else {
      setTelephoneError("");
    }

    if (role.trim() === "") {
      setRoleError("Role is required");
      isValid = false;
    } else {
      setRoleError("");
    }

    return isValid;
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const nomChangeHandler = (event) => {
    setNom(event.target.value);
  };

  const prenomChangeHandler = (event) => {
    setPrenom(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const cinChangeHandler = (event) => {
    setCin(event.target.value);
  };

  const telephoneChangeHandler = (event) => {
    setTelephone(event.target.value);
  };

  const selectHandler = (event) => {
    setRole(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Don't proceed if validation fails
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cin", cin);
    formData.append("telephone", telephone);
    formData.append("role", role);
    formData.append("image", image);

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8082/api/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      setImage("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccessMessage("New Client has been saved");
    } catch (error) {
       if (error.response && error.response.status === 400 && error.response.data) {
           // Handle duplication error (status code 400)
           const errorMessage = error.response.data.msg;
           if (errorMessage.includes("Email duplication")) {
             // Handle email duplication
             setEmailError(errorMessage);
           } else if (errorMessage.includes("Cin duplication")) {
             // Handle Cin duplication
             setCinError(errorMessage);
           } else {
             // Handle other errors
             setErrorMessage("An unexpected error occurred");
             console.error("Error creating user:", error);
           }
       }
    }
  };

  return (
    <div className="newUser">
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


      <h1 className="newUserTitle">New Client</h1>
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
          {nomError && <div className="error">{nomError}</div>}
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
          {prenomError && <div className="error">{prenomError}</div>}
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
          {cinError && <div className="error">{cinError}</div>}
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
          {telephoneError && <div className="error">{telephoneError}</div>}
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
          {emailError && <div className="error">{emailError}</div>}
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
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={imageChangeHandler} ref={fileInputRef} />
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
