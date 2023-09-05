import React, {useEffect, useState} from "react";
import axios from "axios"
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams} from "react-router-dom";
import "./SingleEmploye.css";

export default function SingleEmploye() {
 
  const params = useParams();
  console.log(params.userId)
  useEffect(() => {
    getUserById()
  },[]);
  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [password, setPassword] = useState('')
  const [cin, setCin] = useState('')
  const[image, setImage] = useState('')
      const[imageUrl, setImageUrl] = useState('')
      const[telephone, setTelephone] = useState('')
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  useEffect(() => {
            if (image) {
              getUserImage();
            }
          }, [image]);
  const getUserById = async () => {
    const result = await axios.get("http://localhost:8082/api/user/"+params.userId,
    {
          headers: {
           "Authorization": `Bearer ${token}`,
          }
    });
    console.log("hetha l objet jibneh mel api",result)
    const data = result.data
    setEmail(data.email)
    setNom(data.nom)
    setPrenom(data.prenom)
    setCin(data.cin)
    setImage(data.imagePath)
    setTelephone(data.telephone)
  }

   const getUserImage = async () => {
           const result = await axios.get("http://localhost:8082/api/images/" + image, {
             headers: {
               "Authorization": `Bearer ${token}`,
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
    setEmail(event.target.value)
  }
  const telephoneChangeHandler = (event) => {
      setTelephone(event.target.value)
    }
  const nomChangeHandler = (event) => {
  console.log("hetha l objet event mta3 changehandler ",event)
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
                     "Authorization": `Bearer ${token}`,
                     "Content-Type": "multipart/form-data",
                   },
                 }
               );

               // Handle the response, e.g., show success message, redirect, etc.
               console.log("User updated:", response.data);
             } catch (error) {
               // Handle error, e.g., show error message
               console.error("Error updating user:", error);
             }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Modifier Employe</h1>
       
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">  
            <img
              src={imageUrl}
              alt="" 
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{nom +' '+ prenom}</span>
              <span className="userShowUserTitle">Employe </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">compte détaille</span>
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
                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => handleImageChange(e.target.files[0])} />
              </div>
              <button type="submit" className="userUpdateButton">Modifier</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
