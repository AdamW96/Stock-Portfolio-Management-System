import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Home,
  Person,
  List,
  PhotoCamera,
  PlayCircleOutline,
  TabletMac,
  Bookmark,
  Storefront,
  Settings,
  ExitToApp,
} from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth-service";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(13),
    position: "sticky",
    top: 0,
    color: "#555",

    // borderRight: "1px solid #f1f0ed",
  },

  item: {
    display: "flex",
    alignItems: "center",
    fontSize: "100%",
    fontWeight: "500",
    fontFamily: "Bungee",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    "&:hover": {
      backgroundColor: "#f1f0ed",
      transition: "color 0.3s ease-out",
      color: "#FF954A",
      cursor: "pointer",
      borderRadius: "20px",
    },
  },

  icon: {
    marginRight: theme.spacing(1),
    fontSize: "25px",
  },

  text: {
    fontWeight: "700",
  },
  buttons: {},
  signButton: {
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(50),
    width: "100%",
  },
  registerButton: {
    width: "100%",
    borderRadius: theme.spacing(1),
    borderColor: theme.palette.success.light,
    color: theme.palette.success.main,
    marginTop: theme.spacing(2),
    "&:hover": {
      color: theme.palette.success.dark,
    },
  },
}));

function Leftbar(props) {
  const classes = useStyles();
  const history = useHistory();
  let { currentUser, setCurrentUser } = props;
  const handleLogout = () => {
    console.log("you are coming to handlelogout");
    // localStorage.removeItem("user");
    AuthService.logout();
    setCurrentUser(null);
    history.push("/");
  };
  return (
    <Container className={classes.container}>
      <Link to="/" style={{ textDecoration: "none", color: "#555" }}>
        <div className={classes.item}>
          <Home className={classes.icon} />
          Home
        </div>
      </Link>

      <Link to="/portfolios" style={{ textDecoration: "none", color: "#555" }}>
        <div className={classes.item}>
          <List className={classes.icon} />
          Portfolios
        </div>
      </Link>

      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        Collections
      </div>
      <div className={classes.item}>
        <Storefront className={classes.icon} />
        Market
      </div>
      {!currentUser && (
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/register");
            }}
            className={classes.signButton}
          >
            Sign Up
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              history.push("/signin");
            }}
            className={classes.registerButton}
          >
            Sign in
          </Button>
        </div>
      )}
      {currentUser && (
        <div>
          <div className={classes.item}>
            <Person className={classes.icon} />
            Profile
          </div>
          <div onClick={handleLogout} className={classes.item}>
            <ExitToApp className={classes.icon} />
            Logout
          </div>
        </div>
      )}
    </Container>
  );
}

export default Leftbar;
