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
import "./Detail.css";

export default function User() {

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

  const getUserById = async () => {
    const result = await axios.get("http://localhost:8082/api/user/"+params.userId)
    console.log("hetha l obket jibneh mel api",result)
    const data = result.data
    setEmail(data.email)
    setNom(data.nom)
    setPrenom(data.prenom)
    setCin(data.cin)
  }



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
        <h1 className="userTitle">Detail Reclamation</h1>

      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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

      </div>
    </div>
  );
}
