import React, { useState } from "react";
import { useLocation } from "react-router";
import Navigation from "../Components/Navigation";
import Left from "../Components/Left";
import Right from "../Components/Right";
import Feed from "../Components/Feed";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Info, InfoRounded } from "@material-ui/icons";
// import AuthService from "../services/auth-service";


const styles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default function Stock(props) {
  const classes = styles();
  const location = useLocation().pathname
  const stockId = location.split('/')[2]
  console.log('check sid',stockId)
  let { currentUser, setCurrentUser, allStocks } = props;
  console.log(allStocks)
  let info = {enname:'', tsCode:'', name:'',area:'',industry:'',fullname:'',market:''}
  for(let i=0;i<allStocks.length;i++) {
    if(stockId == allStocks[i].sid) {
      info.sid = allStocks[i].sid
      info.enname = allStocks[i].enname
      info.tsCode = allStocks[i].tsCode
      info.name = allStocks[i].name
      info.area = allStocks[i].area
      info.industry = allStocks[i].industry
      info.fullname = allStocks[i].fullname
      info.market = allStocks[i].market
      break
    }
  }
  console.log(info)
  return (
    <div>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container className={classes.container}>
        <Grid item sm={2}>
          <Left currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Grid>

        <Grid item sm={7}>
          <Feed stock info={info}/>
        </Grid>

        <Grid item sm={3}>
          <Right
            stock
            info = {info}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}  
          />
        </Grid>
      </Grid>
    </div>
  );
}
