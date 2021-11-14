import {
  Container,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import RecomendCard from "./RecomendCard";
import { randoms, randoms2, about } from './Fakedata';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
  },
  headText: {
    fontFamily: "Bungee",
    fontSize:  '1.2rem',
    color: "#FF954A",
    marginLeft: theme.spacing(1),
    width:"100%"
  },
  text: {
    fontFamily: "Bungee",
    marginLeft: theme.spacing(1),
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  recomends: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4)
  },
  backgroundText: {
    padding: '0 7px',
    paddingBottom: '16px',
    fontSize: '1rem',
    fontWeight: 300,
  },
  infoLines: {
    padding: '0 2%'
  }
  ,
  infoLine: {
    display: 'flex',
    justifyContent: 'space-between',
    // width:'90%',
    padding: '8px 3px'
  }
}));



const RightHomepage = ({ currentUser, setCurrentUser }) => {
  const loginState = useSelector(state => state.loginState);

  const classes = useStyles();
  return (
    <Container className={classes.container}>

      {!loginState &&
        <>
    
        <img src='images/join.png' style={{width:"100%",height:'60vh',borderRadius:'1rem'}} alt="" />
        <Typography className={classes.headText} style={{
          display:'flex',justifyContent:'flex-end',paddingRight:'1.5rem',marginTop:'2rem',
          }}>Join Us↑↑</Typography>

        </>
      }
      {loginState &&
        <>
          <Typography className={classes.headText}>Your Rank</Typography>
          <Typography variant='caption' className={classes.text}> You Daily Gain have defeated 73% users</Typography>
        </>
      }
    </Container>
  );
}

const RightPortfolios = () => {
  const classes = useStyles();
  const [random, setRandom] = useState(false);
  let recomendsData = random ? randoms : randoms2;
  return (
    <>
      <Container className={classes.container}>
        {/* <Paper variant='outlined'> */}
        <Typography className={classes.headText} >Discover more</Typography>

        <div className={classes.subtitle}>
          <Typography variant='caption' className={classes.text}>You may be interested in</Typography>
          <IconButton color='primary' onClick={() => setRandom(!random)}>
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

const RightStock = (props) => {
  const classes = useStyles();
  const {info} = props
  console.log('right info',info)
  return (
    <>
      <Container className={classes.container}>

        <Paper variant='outlined'>
          <Typography className={classes.headText} >About</Typography>

          {/* <div  >
            <Typography className={classes.backgroundText}  >{about.ABOUT}</Typography>
          </div> */}

          <div className={classes.infoLines}>
            <Divider />
            <div className={classes.infoLine}>
              <Typography variant='subtitle2'>MARKET</Typography>
              <Typography variant='body2'>{info.market}</Typography>
            </div>
            <Divider />
            <div className={classes.infoLine}>
              <Typography variant='subtitle2'>AREA</Typography>
              <Typography variant='body2'>{info.area}</Typography>
            </div>
            <Divider />
            <div className={classes.infoLine}>
              <Typography variant='subtitle2'>INDUSTRY</Typography>
              <Typography variant='body2'>{info.industry}</Typography>
            </div>
            <Divider />
            <div className={classes.infoLine}>
              <Typography variant='subtitle2'>CN NAME</Typography>
              <Typography variant='body2'>{info.name}</Typography>
            </div>
            <Divider />
            <div className={classes.infoLine}>
              <Typography variant='subtitle2'>FULLNAME</Typography>
              <Typography variant='body2'>{info.fullname}</Typography>
            </div>
          </div>
        </Paper>
      </Container>

    </>
  );
}

export default function Right({
  currentUser, setCurrentUser, stock, portfolio, homepage, info }) {
    console.log(info)
  return (
    <>
      {homepage ? <RightHomepage currentUser={currentUser} setCurrentUser={setCurrentUser} /> : ''}
      {portfolio ? <RightPortfolios /> : ''}
      {stock ? <RightStock info={info}/> : ''}
    </>
  );
}
