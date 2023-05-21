import "./newUser.css";
import {useEffect, useState} from "react";
import axios from "axios"



export default function NewUser() {

  const [email, setEmail] = useState("")
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [password, setPassword] = useState("")


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
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
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
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
          <div className="newUserItem">
            <label> Role </label>
            <select name="roles" id="role-select">
                <option value="">--Please choose an option--</option>
                <option value="Admin">Admin</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
            </select>

          </div>
        </div>
        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
  );
}
