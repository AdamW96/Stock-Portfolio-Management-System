import React from "react";
import Navigation from "../Components/Navigation";
import Left from "../Components/Left";
import Right from "../Components/Right";
// import Feed from "../Components/Feed";
import { Grid,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import AuthService from "../services/auth-service";
// import portfolioService from "../services/portfolio-service";
import PortfoliosList from "../Components/PortfoliosList";

const styles = makeStyles((theme) => ({
  container: {
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
  },
}));

export default function MyPortfolios(props) {
  const classes = styles();
  let { currentUser, setCurrentUser, setShowAlert } = props;
  return (
    <div>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container className={classes.container}>
        <Grid item sm={2}>
          <Left currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Grid>
        <Grid item sm={7}>
          <PortfoliosList currentUser={currentUser} setCurrentUser={setCurrentUser} setShowAlert={setShowAlert}/>
        </Grid>
        <Grid item sm={3}>
          <Right
            portfolio
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Grid>
      </Grid>
    </div>
  );
}
