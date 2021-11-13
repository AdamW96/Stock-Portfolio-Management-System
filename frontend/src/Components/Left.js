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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux/index";

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
}));

function Leftbar(props) {
  const classes = useStyles();
  const history = useHistory();
  let { currentUser, setCurrentUser } = props;

  const handleLogout = () => {
    console.log("you are coming to handlelogout");
    AuthService.logout();
    setCurrentUser(AuthService.getCurrentUser())
    history.push("/");
  };
  return (
    <Container className={classes.container}>
      <Link to='/' style={{ textDecoration: "none", color: "#555" }}>
        <div className={classes.item}>
          <Home className={classes.icon} />
          Home
        </div>
      </Link>
      {currentUser && (
        <Link
          to='/portfolios'
          style={{ textDecoration: "none", color: "#555" }}
        >
          <div className={classes.item}>
            <List className={classes.icon} />
            Portfolios
          </div>
        </Link>
      )}
      {/* <div className={classes.item}>
        <Bookmark className={classes.icon} />
        Collections
      </div> */}
      <Link to='/market' style={{ textDecoration: "none", color: "#555" }}>
        <div className={classes.item}>
          <Storefront className={classes.icon} />
          Market
        </div>
      </Link>
      {currentUser && (
        <>
          {/* <div className={classes.item}>
              <Person className={classes.icon} />
              Profile
            </div> */}
          <div onClick={handleLogout} className={classes.item}>
            <ExitToApp className={classes.icon} />
            Logout
          </div>
        </>
      )}
    </Container>
  );
}

export default Leftbar;
