import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./login.css"; // Import the CSS file for styling
import { AuthContext } from "../../context/AuthContext";
import loginImage from '../images/login.jpg'
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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {authenticated, setAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8082/auth/authenticate", {
        email: email,
        password: password,
      });

      // If the API call is successful and returns a token, you can handle it as per your requirement
      const token = response.data.token;
      const role = response.data.role;
      const id = response.data.id;
      const image = response.data.image;
      const nom = response.data.prenom + " " + response.data.nom;
      // For now, we will just log the token in the console
      console.log("Authentication successful. Token:", response.data);

      //Save the token to lacal storage
      localStorage.setItem('token',token);
      localStorage.setItem('role',role);
      localStorage.setItem('id',id);
      localStorage.setItem('image',image);
      localStorage.setItem('nom',nom);


      setAuthenticated(true);
      // Redirect to home route after successful authentication
      history.push("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };
  const handleForgotPasswordClick = () => {
      // Redirect to the ForgotPassword route
      history.push("/forgotPassword");
    };

  return (
    
    <div className="container">
    <div className="chart">
      <img
        className="loginUpdateImg"
        src={loginImage}
        alt="login"
      />
  </div>

    <Container className={classes.root}>
      <Paper className={`${classes.paper} login-paper`} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        
            </form>
        
      </Paper>

    </Container>
    <Typography
                            variant="subtitle2"
                            className="forgot-password-link"
                            onClick={handleForgotPasswordClick}
                          >
                            Mot de passe oublié ?
                          </Typography>
    </div>
  );
};

export default Login;
