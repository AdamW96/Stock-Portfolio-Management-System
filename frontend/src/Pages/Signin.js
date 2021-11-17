import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  Grid,

  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../services/auth-service"

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
  },
  registerButton: {
    width: "60%",
    borderRadius: theme.spacing(1),
    fontSize: "1.2rem",
    backgroundColor: theme.palette.success.main,
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export default function Login(props) {
  const classes = usestyles();
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
  let { setShowAlert,setCurrentUser } = props
 
  const showAlert = (type, content) => {
    window.alert = true
    setShowAlert({alertType:type, alertContent:content})
  }

  const handleChangeEmail = (e) => {
    // console.log(email);
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    // console.log(password);
    setPassword(e.target.value);
  };
  const handleSignin = () => {
    AuthService.signin(email, password)
      .then((response) => {
        if(response.data.code !== 200) {
          showAlert('error','Invalid email or password')
          return
        }
        let userData = {cookie:`cookie_email=${email}`, data:response.data.data}
        localStorage.setItem("user", JSON.stringify(userData));
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        showAlert('success','log in successfully')
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(loginState);
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
              <img src={path+'final-logo.png'} alt="" className={classes.logo} />
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
                className={classes.signButton}
              >
                next
              </Button>
              {/* <Link>Forget Password?</Link> */}
              <Button
                variant="contained"
                color="primary"
                onClick = {()=>{history.push('/register')}}
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
