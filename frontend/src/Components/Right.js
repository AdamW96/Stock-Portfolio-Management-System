import {
  Card,
  Container,
  IconButton,
  InputBase,
  makeStyles,

  Paper,

  Tooltip,

  Typography,
} from "@material-ui/core";
import { useState } from "react";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RecomendCard from "./RecomendCard";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(13),
  },
  headText: {
    fontFamily: "Bungee",
    fontSize: theme.spacing(4),
    color: "#FF954A",
    marginLeft: theme.spacing(1),
  },
  text: {
    fontFamily: "Bungee",
    fontSize: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  recomends: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'space-around'
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(14),
    //   height: theme.spacing(17),
    // },
  }
}));



const RightHomepage = ({ currentUser, setCurrentUser }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper>
        {!currentUser && <Typography className={classes.headText}>Join Us!!</Typography>}
        {currentUser && <Typography className={classes.text}>Your Rank</Typography>}
      </Paper>
    </Container>
  );
}

const RightPortfolios = () => {
  const classes = useStyles();
  return (
  <>
    <Container className={classes.container}>
      {/* <Paper variant='outlined'> */}
      <Typography className={classes.headText}>Discover more</Typography>
      <Typography className={classes.text}>You may be interested in</Typography>
    </Container>


    <div className={classes.recomends}>
        <RecomendCard/>
        <RecomendCard/>
        <RecomendCard/>
        <RecomendCard/>
        <RecomendCard/>
        <RecomendCard/>

      </div>

  </>
  );
}

export default function Right({
  currentUser, setCurrentUser, stock, portfolio, homepage }) {

  return (
    <>
      {homepage ? <RightHomepage currentUser={currentUser} setCurrentUser={setCurrentUser} /> : ''}
      {portfolio ? <RightPortfolios /> : ''}
    </>
  );
}
