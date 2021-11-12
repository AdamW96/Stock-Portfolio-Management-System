import React, { useState } from "react";
import Navigation from "../Components/Navigation";
import Left from "../Components/Left";
import Right from "../Components/Right";
import Feed from "../Components/Feed";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Portfolio from "../Components/Portfolio"
// import AuthService from "../services/auth-service";


const styles = makeStyles((theme) => ({
  container: {
    paddingLeft: "12.5%",
    paddingRight: "12.5%",
  },
}));

export default function Stock(props) {
  const classes = styles();

  let { currentUser, setCurrentUser, allStocks } = props;
  return (
    <div>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container className={classes.container}>
        <Grid item sm={2}>
          <Left currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Grid>
        <Grid item sm={7}>
        <Portfolio allStocks={allStocks}/>
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
