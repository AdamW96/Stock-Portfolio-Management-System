import {
  Container,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import rankService from "../services/rank-service";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
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
    // marginLeft: '1rem',
  },
  subtitle: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-around',
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

  const classes = useStyles();
  return (
    <Container className={classes.container}>


    
        <img src='images/join.png' style={{width:"100%",height:'60vh',borderRadius:'1rem'}} alt="" />
        <Typography className={classes.headText} style={{
          display:'flex',justifyContent:'flex-end',paddingRight:'1.5rem',marginTop:'2rem',
          }}>Join Us↑↑</Typography>

        
    </Container>
  );
}

const RightPortfolios = () => {
  const classes = useStyles();
  const [rank,setRank] = useState('')
  useEffect(()=>{
    rankService.getRank().then(res=>setRank(res.data.data))
  },[rank])

  
  return (
    <>
      <Container className={classes.container}>
      <Paper variant='outlined'>
        {/* <Paper variant='outlined'> */}
      
        <div className={classes.subtitle}>
          <Typography  className={classes.headText}>Congratulations!</Typography>
          <Typography  className={classes.text}>Your yesterday's Rank is:</Typography>
          {rank? <Typography  style={{fontFamily:'Bungee',fontSize:'4rem'}}>Rank {rank}</Typography> :<div></div>}
        </div>
      </Paper>


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
