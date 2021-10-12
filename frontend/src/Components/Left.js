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
import AuthService from "../services/auth-serive";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(12),
    position: "sticky",
    top: 0,
    color: "#555",
    borderRight: "1px solid #f1f0ed",
  },

  item: {
    display: "flex",
    alignItems: "center",
    fontSize: "120%",
    fontWeight: "500",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    "&:hover": {
      backgroundColor: "#f1f0ed",
      transition: "color 0.5s ease-out",
      color: "#FF954A",
      cursor: "pointer",
      borderRadius: "20px",
    },
  },

  icon: {
    marginRight: theme.spacing(1),
    fontSize: "20px",
  },

  text: {
    fontWeight: "700",
  },
  buttons: {},
  signButton: {
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(35),
    width: "100%",
  },
  registerButton: {
    width: "100%",
    borderRadius: theme.spacing(1),
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
  const checkRouterAndUser = () => {
    console.log("coming to left component");
    console.log(currentUser);
  };
  checkRouterAndUser();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Home className={classes.icon} />
        Home
      </div>
      <div className={classes.item}>
        <List className={classes.icon} />
        Portfolios
      </div>
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
            color="secondry"
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
