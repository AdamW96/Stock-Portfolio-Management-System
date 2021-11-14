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

const usestyles = makeStyles((theme) => ({
  login: {
    height: "100vh",
    paddingLeft: "4.5%",
    paddingRight: "4.5%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  loginWarpper: {
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
    fontSize: "7rem",
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
    width:'10rem',
    marginBottom:'2rem'
  },
  userInfo: {
    width: "80%",
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  signButton: {
    width: "60%",
    borderRadius: theme.spacing(1),
    fontSize: "1.2rem",
    marginBottom:'0.5rem',
  },
  registerButton: {
    width: "60%",
    borderRadius: theme.spacing(1),
    fontSize: "1.2rem",
    backgroundColor: theme.palette.success.main,
    marginTop:'0.5rem',
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export default function Register(props) {
  const classes = usestyles();
  const history = useHistory();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let {setShowAlert} = props

  const showAlertMsg = (type, content)=>{
    window.alert = true
    setShowAlert({alertType:type, alertContent:content})
  }

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(firstName, lastName, userName, email, password)
      .then((response) => {
        if(response.data.code !== 200) {
          showAlertMsg('error','Email is already registered, please change a new one')
          return
        }
        showAlertMsg('success','Register successfully, you can sign in now')
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err.response);
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
          <Container>
            <Paper elevation={3} className={classes.signForm}>
              <img src="https://i.loli.net/2021/11/14/Wuyez4AUfFBY2r5.png" alt="" className={classes.logo} />
              <TextField
                onChange={handleChangeFirstName}
                label="First Name"
                variant="outlined"
                className={classes.userInfo}
                size='small'
              />
              <TextField
                onChange={handleChangeLastName}
                label="Last Name"
                variant="outlined"
                className={classes.userInfo}
                size='small'
              />
              <TextField
                onChange={handleChangeEmail}
                label="Email"
                type="email"
                variant="outlined"
                className={classes.userInfo}
                size='small'
              />
              <TextField
                onChange={handleChangeUserName}
                label="Username"
                variant="outlined"
                className={classes.userInfo}
                size='small'
              />
              <TextField
                onChange={handleChangePassword}
                label="Password"
                type="password"
                variant="outlined"
                className={classes.userInfo}
                size='small'
              />
              <Button
                onClick={handleRegister}
                type="submit"
                variant="contained"
                color="primary"
                href=""
                className={classes.signButton}
              >
                Sign up
              </Button>
              <Typography variant="body2">Already have an account?</Typography>

              <Button
                variant="contained"
                color="primary"
                onClick = {()=>{
                  history.push('/signin')
                }}
                className={classes.registerButton}
              >
                Sign in
              </Button>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
