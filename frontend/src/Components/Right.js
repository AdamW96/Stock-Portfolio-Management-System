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
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(14),
      height: theme.spacing(17),
    },
  },
  recomendCard: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    '&:hover': {
      boxShadow: theme.shadows[2],
    }
  },
  color: {
    backgroundColor: props => props.gainers ? '#e1f2e7' : '#fee5e3',
    padding: '3px 5px',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignContent: 'center',
    color: props => props.gainers ? 'green' : '#a50e0e',
    maxWidth: 'fit-content'
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',

  },
  Addicon: {
    marginLeft: 'auto',
    "&:hover": {
      color: '#FF954A',
      transition: "all 0.3s ease-out",
      cursor: 'pointer'
    }
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
    <Container className={classes.container}>
      {/* <Paper variant='outlined'> */}
      <Typography className={classes.headText}>Discover more</Typography>
      <Typography className={classes.text}>You may be interested in</Typography>

      <div className={classes.recomends}>
        <Paper className={classes.recomendCard} variant='outlined'>
          <Typography variant='subtitle2'>BABA</Typography>
          <Typography variant='caption' >Alibabasssssssssssssssssss Group Holding Ltd</Typography>
          <Typography variant='subtitle2' >$177.42</Typography>

          <Typography variant='subtitle2' className={classes.buttonRow}>
            <div className={classes.color}>
              <ArrowUpwardIcon fontSize='small' />0.14%
            </div>
            <Tooltip title='Add To Portifolio'>
              <AddCircleOutlineIcon className={classes.Addicon} />
            </Tooltip>
          </Typography>

        </Paper>

      </div>
      {/* </Paper> */}
    </Container>
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
