// ForgotPassword.js
import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./forget.css"; // Import the CSS file for styling
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
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const closeSuccessMessage = () => {
          setSuccessMessage("");
        };

        const [errorMessage, setErrorMessage] = useState("");

        const clearErrorMessage = () => {
          setErrorMessage("");
        };

  const validateInputs = () => {
            let isValid = true;

            if (email.trim() === "") {
              setEmailError("Entre votre email");
              isValid = false;
            } else if (!email.includes("@")) {
                   setEmailError("Invalid email format");
                   isValid = false;
            }else {
              setEmailError("");
            }
            return isValid;
          };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
                          return; // Don't proceed if validation fails
                        }
    const formData = new FormData();
          formData.append("email", email);

    try {
      // Send a POST request to the forgotPassword API
      const response = await axios.post("http://localhost:8082/auth/forgotPassword",
                formData,/*besh nabaathu email eli fl value ll back*/
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });

      // Handle the response message
      setMessage(response.data.message);
      setSuccessMessage("Veuillez vérifier le lien que nous avons envoyé à votre adresse e-mail.");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (


      <div className="home">
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
              <div className="container">
       <div className="chart">
              <img
                className="imagefor"
                src={forgetImage}
                alt="forget"
              />
          </div>
          <div className="forgetpaper ">
 <Container className={classes.root}>
      <Paper className={`${classes.paper} forgetpaper `} elevation={3}>

        <Typography variant="h6" gutterBottom style={{ margin: '15px' }}>
          Mot de passe oublié ?
        </Typography>
        {message && <Typography>{message}</Typography>}
        <form className={classes.form} onSubmit={handleSubmit}>
         {emailError && <div className="error">{emailError}</div>}
          <TextField style={{ margin: '4px' }}
            label="Entrer votre Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />

     <div style={{ display: 'flex', justifyContent: 'center' }}>

          <Button  type="submit" variant="contained" color="primary" style={{ width: '250px' }} >
            Réinitialiser le mot de passe
          </Button>
          </div>

        </form>

      </Paper>

    </Container>
     </div>
      </div>
       </div>
  );
};

export default ForgotPassword;
