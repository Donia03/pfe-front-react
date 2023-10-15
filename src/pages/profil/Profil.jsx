import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./Profil.css";
import { useUser } from "../../components/hooks/useUser";

export default function Profil() {
  const params = useParams();

  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [cin, setCin] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [telephone, setTelephone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setUser } = useUser();

   const [emailError, setEmailError] = useState("");
    const [prenomError, setPrenomError] = useState("");
    const [nomError, setNomError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [cinError, setCinError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [imageError, setImageError] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const closeSuccessMessage = () => {
      setSuccessMessage("");
    };

    const [errorMessage, setErrorMessage] = useState("");

    const clearErrorMessage = () => {
      setErrorMessage("");
    };


  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    if (image) {
      getUserImage();
    }
  }, [image]);

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
      } else {
        setCinError("");
      }

      if (telephone.trim() === "") {
        setTelephoneError("Telephone is required");
        isValid = false;
      } else {
        setTelephoneError("");
      }
      if (oldPassword.trim() === "") {
              setOldPasswordError("Old password is required");
              isValid = false;
            } else {
              setOldPasswordError("");
            }
      if (newPassword.trim() === "") {
                    setNewPasswordError("New password is required");
                    isValid = false;
                  } else {
                    setNewPasswordError("");
                  }

      return isValid;
    };

    const validatePasswordInputs = () => {
          let isValid = true;

          if (oldPassword.trim() === "") {
                  setOldPasswordError("Old password is required");
                  isValid = false;
                } else {
                  setOldPasswordError("");
                }
          if (newPassword.trim() === "") {
                        setNewPasswordError("New password is required");
                        isValid = false;
                      } else {
                        setNewPasswordError("");
                      }

          return isValid;
        };
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('id');

  const getUserById = async () => {
    const result = await axios.get(
      "http://localhost:8082/api/user/" + params.userId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("hetha l obket jibneh mel api", result);
    const data = result.data;
    setEmail(data.email);
    setNom(data.nom);
    setPrenom(data.prenom);
    setCin(data.cin);
    setImage(data.imagePath);
    setTelephone(data.telephone);
  };

  const getUserImage = async () => {
    const result = await axios.get("http://localhost:8082/api/images/" + image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Tell Axios to handle the response as a blob (binary data)
    });

    const blob = result.data;

    // Convert the blob to a base64-encoded URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setImageUrl(base64data);
    };
    reader.readAsDataURL(blob);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const telephoneChangeHandler = (event) => {
    setTelephone(event.target.value);
  };
  const nomChangeHandler = (event) => {
    console.log("hetha l objet event mta3 changehandler ", event);
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
  const oldPasswordChangeHandler = (event) => {
    setOldPassword(event.target.value);
  };

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };


  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    formData.append("cin", cin);
    formData.append("telephone", telephone);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8082/api/user/${params.userId}/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response, e.g., show success message, redirect, etc.
      setUser(response.data);
      // After successfully fetching and updating user data
      localStorage.setItem('userData', JSON.stringify(response.data));


          // Handle the response, e.g., show success message, redirect, etc.
          console.log('User updated:', response.data);
          setSuccessMessage("Profil has been modified");
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Error updating user:", error);
      setErrorMessage("An unexpected error occurred");
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validatePasswordInputs()) {
                          return; // Don't proceed if validation fails
                        }

    // Create an object to send to the API
    const passwordData = {
      oldPass: oldPassword,
      newPass: newPassword,
    };

    try {
      const response = await axios.post(
        `http://localhost:8082/api/changerPassword/${params.userId}`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response, e.g., show success message, redirect, etc.
      console.log("Password changed:", response.data);
      setOldPassword('');
      setNewPassword('');
      setSuccessMessage("Password has been changed")
    } catch (error) {
     const errorMessage = error.response.data.msg;
               if (errorMessage.includes("Incorect Password")) {
                 // Handle email duplication
                 setOldPasswordError(errorMessage);
               } else {
                 // Handle other errors
                 setErrorMessage("An unexpected error occurred");
    }
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
      <div className="userTitleContainer">
        <h1 className="userTitle">Mon Compte</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={imageUrl} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{nom + " " + prenom}</span>
              <span className="userShowUserTitle">Welcome</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">details compte</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{prenom}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{nom}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{cin}</span>
            </div>

            <span className="userShowTitle">Contact </span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{telephone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Modifier</span>
          <form onSubmit={handleSubmit} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nom</label>
                <input
                  name={"nom"}
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  value={nom}
                  onChange={nomChangeHandler}
                />
                {nomError && <div className="error">{nomError}</div>}
              </div>
              <div className="userUpdateItem">
                <label>Prénom</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  name={"prenom"}
                  value={prenom}
                  onChange={prenomChangeHandler}
                />
                {prenomError && <div className="error">{prenomError}</div>}
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  name={"email"}
                  value={email}
                  onChange={emailChangeHandler}
                />
                {emailError && <div className="error">{emailError}</div>}
              </div>
              <div className="userUpdateItem">
                <label>Cin</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  name={"cin"}
                  value={cin}
                  onChange={cinChangeHandler}
                />
                {cinError && <div className="error">{cinError}</div>}
              </div>
              <div className="userUpdateItem">
                <label>Telephone</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  name={"telephone"}
                  value={telephone}
                  onChange={telephoneChangeHandler}
                />
                {telephoneError && <div className="error">{telephoneError}</div>}
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={imageUrl}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
              </div>
              <button type="submit" className="userUpdateButton">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="passwordChange">
        <span className="userUpdateTitle">Changer mot de passe</span>
        <form onSubmit={handleChangePassword} className="userUpdateForm">
          <div className="userUpdateItem">
            <label>Ancien mot de passe</label>
            <input
              type="password"
              placeholder=""
              className="userUpdateInput"
              value={oldPassword}
              onChange={oldPasswordChangeHandler}
            />
            {oldPasswordError && <div className="error">{oldPasswordError}</div>}
          </div>
          <div className="userUpdateItem">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              placeholder=""
              className="userUpdateInput"
              value={newPassword}
              onChange={newPasswordChangeHandler}
            />
            {newPasswordError && <div className="error">{newPasswordError}</div>}
          </div>
          <button type="submit" className="userUpdateButton">
            Enregistrer
          </button>
        </form>
      </div>

    </div>
  );
}
