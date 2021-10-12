import { Container, Typography } from "@material-ui/core";
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
        <div>
          <div
            onClick={() => {
              history.push("/register");
            }}
            className={classes.item}
          >
            Sign Up
          </div>
          <div
            onClick={() => {
              history.push("/signin");
            }}
            className={classes.item}
          >
            Sign In
          </div>
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
