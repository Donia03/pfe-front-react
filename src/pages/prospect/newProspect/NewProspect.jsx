import "./NewProspect.css";
import {useEffect, useState} from "react";
import axios from "axios"



export default function NewUser() {

  const [email, setEmail] = useState("")
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [password, setPassword] = useState("")
   const [cin, setCin] = useState("")
    const [telephone, setTelephone] = useState("")
    const [role, setRole] = useState("")


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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      cin: cin,
      telephone: telephone,
      role: role
    }

    fetch('http://localhost:8082/api/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    setEmail("")
    setPassword("")
    setPrenom("")
    setNom("")
    setCin("")
    setTelephone("")
    setRole("")
  }
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
            <label> Role </label>

            <select name="roles"  id="role-select" onChange={selectHandler}>
                <option value="">--Please choose an option--</option>
                <option value="employe">Employe</option>
                <option value="client">Client</option>
                <option value="prospect">Prospect</option>

            </select>
          </div>

        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
  );
}
