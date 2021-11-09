import React, { useState } from "react";
import Navigation from "../Components/Navigation";
import Left from "../Components/Left";
import Right from "../Components/Right";
import Feed from "../Components/Feed";
import { Grid,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../services/auth-service";
import portfolioService from "../services/portfolio-service";

const styles = makeStyles((theme) => ({
  container: {
    paddingLeft: "12.5%",
    paddingRight: "12.5%",
  },
}));

export default function MyPortfolios(props) {
  const classes = styles();
  let { currentUser, setCurrentUser } = props;

  const testAPI = () => {
    console.log(currentUser)
    portfolioService.getAll(currentUser.cookie).then((response)=>{
      console.log(response)
    })
  }

  return (
    <div>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container className={classes.container}>
        <Grid item sm={2}>
          <Left currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Grid>

        <Grid item sm={7}>
          <Feed portfolio />
          <Button onClick={testAPI}>Test api</Button>
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
