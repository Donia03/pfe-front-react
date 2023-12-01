import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./resetPassword.css";
import { Link, useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
import forgetImage from '../images/forget.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
     color: "red",
  },
   errorMessage: {
      color: "red", // Vous pouvez choisir n'importe quelle teinte de rouge ici
    },
}));

const ResetPassword = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

const history = useHistory();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
if (!password || !rePassword) {
      setMessage("Les champs de mot de passe ne peuvent pas être vides.");
     return;
    }
    else if (password !== rePassword) {
      setMessage("vérifier mot de passe.");
      return;
    }
    const resetPasswordRequest = {
            token: token,
            newPassword: password,
          };

    try {
      // Send a POST request to resetPassword API
      const response = await axios.post("http://localhost:8082/api/resetPassword", resetPasswordRequest
      );

      // Handle the response message
      setMessage(response.data);
       history.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (


    <div className="container">
     <div className="chart">
                    <img
                      className="imagefor"
                      src={forgetImage}
                      alt="forget"
                    />
                </div>
         <Container className={classes.root}>
      <Paper className={`${classes.paper} reset-password-paper`} elevation={3}>
        <Typography variant="h5" gutterBottom>
           Réinitialiser le mot de passe
        </Typography>
        {message && <Typography className={classes.errorMessage}>{message}</Typography>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Nouveau mot de passe"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            label="Confirmer  mot de passe"
            type="password"
            variant="outlined"
            value={rePassword}
            onChange={handleRePasswordChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Connexion
          </Button>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default ResetPassword;
