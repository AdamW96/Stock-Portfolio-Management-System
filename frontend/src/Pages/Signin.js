import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  CssBaseline,
  Avatar,
  Checkbox,
  FormControlLabel,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../services/auth-service";
// import { useState } from 'react';

const usestyles = makeStyles((theme) => ({
  login: {
    height: "100vh",
    paddingLeft: "10.5%",
    paddingRight: "14.5%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  loginWarpper: {
    // backgroundColor:"#555",
    height: "90%",
    display: "flex",
    alignItems: "center",
  },
  welcome: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: "130px",
    fontWeight: 800,
    color: theme.palette.primary.main,
  },
  signForm: {
    padding: "5% 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    marginBottom: theme.spacing(2),
  },
  userInfo: {
    width: "80%",
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  signButton: {
    width: "80%",
    height: theme.spacing(7),
    borderRadius: theme.spacing(1),
    fontSize: "17px",
    marginBottom: theme.spacing(2),
  },
  registerButton: {
    width: "50%",
    height: theme.spacing(7),
    borderRadius: theme.spacing(1),
    fontSize: "17px",
    backgroundColor: theme.palette.success.main,
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export default function Login() {
  const classes = usestyles();
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    console.log(email);
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    console.log(password);
    setPassword(e.target.value);
  };
  const handleSignin = () => {
    console.log(email, password);
    AuthService.signin(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };
  return (
    <div className={classes.login}>
      <Grid container className={classes.loginWarpper}>
        <Grid item sm={6} xs={6}>
          <Container className={classes.welcome}>
            <Typography variant="h1" className={classes.welcomeText}>
              NBfinance
            </Typography>
            <Typography variant="body2">
              Everyone can become a stock portfolio expert on NBfinance.
            </Typography>
          </Container>
        </Grid>

        <Grid item sm={6} xs={6}>
          {message && <Alert severity="error">{message}</Alert>}
          <Container>
            <Paper elevation={3} className={classes.signForm}>
              <img src="images/logo.png" alt="" className={classes.logo} />
              <TextField
                onChange={handleChangeEmail}
                label="Email"
                type="email"
                variant="outlined"
                className={classes.userInfo}
              />
              <TextField
                onChange={handleChangePassword}
                label="Password"
                type="password"
                variant="outlined"
                className={classes.userInfo}
              />
              <Button
                onClick={handleSignin}
                variant="contained"
                color="primary"
                href=""
                className={classes.signButton}
              >
                next
              </Button>
              <Link>Forget Password?</Link>
              <Button
                variant="contained"
                color="primary"
                href=""
                className={classes.registerButton}
              >
                Create an account
              </Button>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
