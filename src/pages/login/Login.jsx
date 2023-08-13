import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./login.css"; // Import the CSS file for styling
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
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
      // For now, we will just log the token in the console
      console.log("Authentication successful. Token:", token);

      //Save the token to lacal storage
      localStorage.setItem('token',token);
      localStorage.setItem('role',role);


      setAuthenticated(true);
      // Redirect to home route after successful authentication
      history.push("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
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
  );
};

export default Login;
