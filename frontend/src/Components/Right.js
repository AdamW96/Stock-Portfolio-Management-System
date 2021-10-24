import {
  Card,
  Container,
  Icon,
  IconButton,
  InputBase,
  makeStyles,

  Paper,

  Tooltip,

  Typography,
} from "@material-ui/core";
import { useState } from "react";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import RecomendCard from "./RecomendCard";
import {randoms,randoms2} from './Fakedata';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
  },
  headText: {
    fontFamily: "Bungee",
    fontSize: theme.spacing(4),
    color: "#FF954A",
    marginLeft: theme.spacing(1),
  },
  text: {
    fontFamily: "Bungee",
    marginLeft: theme.spacing(1),
  },
  subtitle:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around',
  },
  recomends: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    marginTop:theme.spacing(4)
  },
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
  const [random, setRandom] = useState(false);
  let recomendsData = random? randoms : randoms2;
  return (
  <>
    <Container className={classes.container}>
      {/* <Paper variant='outlined'> */}
      <Typography className={classes.headText} >Discover more</Typography>

      <div className={classes.subtitle}>
        <Typography variant='caption' className={classes.text}>You may be interested in</Typography>
        <IconButton color='primary' onClick={()=>setRandom(!random)}>
          <AutorenewIcon fontSize='small' />
        </IconButton>

      </div>
      

      <div className={classes.recomends}>
          {recomendsData.map((stock) => (
            <RecomendCard key={stock.symbol} data={stock} />
          ))}
      </div>

    </Container>

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
