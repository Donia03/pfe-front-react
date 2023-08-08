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
import "./user.css";

export default function User() {

  const params = useParams();
  console.log(params.userId)

  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [password, setPassword] = useState('')
  const [cin, setCin] = useState('')
  const[image, setImage] = useState('')
  const[imageUrl, setImageUrl] = useState('')

   useEffect(() => {
      getUserById()
    },[]);

    useEffect(() => {
        if (image) {
          getUserImage();
        }
      }, [image]);



const token = localStorage.getItem('token');

 const getUserById = async () => {
    const result = await axios.get("http://localhost:8082/api/user/"+params.userId,{
        headers: {
        "Authorization": `Bearer ${token}`,
        },
    })
    console.log("hetha l obket jibneh mel api",result)
    const data = result.data
    setEmail(data.email)
    setNom(data.nom)
    setPrenom(data.prenom)
    setCin(data.cin)
    setImage(data.imagePath)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      cin: cin,
    }

    fetch('http://localhost:8082/api/user/'+params.userId, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
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
              <span className="userShowUsername">{nom + prenom}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{prenom}</span>
            </div>
             <div className="userShowInfo">
                          <PermIdentity className="userShowIcon" />
                          <span className="userShowInfoTitle">{cin}</span>
                        </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={handleSubmit} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
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
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button type="submit" className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
