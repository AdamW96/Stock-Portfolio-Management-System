import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home,Person,List, PhotoCamera, PlayCircleOutline, TabletMac, Bookmark, Storefront, Settings, ExitToApp, } from '@material-ui/icons';

const useStyles = makeStyles((theme)=>({
  container:{
    height:'100vh',
    paddingTop:theme.spacing(12),
    position:'sticky',
    top:0,
    color:'#555',
    borderRight:'1px solid #f1f0ed'
  },

  item:{
    display:'flex',
    alignItems:'center',
    fontSize:'120%',
    fontWeight:'500',
    padding:theme.spacing(3),
    marginBottom:theme.spacing(3),
    '&:hover':{
      backgroundColor:'#f1f0ed',
      transition:'color 0.5s ease-out',
      color:'#FF954A',
      cursor:'pointer',
      borderRadius:'20px'},
  },

  icon:{
    marginRight:theme.spacing(1),
    fontSize:'20px'
  },

  text:{
    fontWeight:'700',
  }
}))

function Leftbar() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Home className={classes.icon }/>Home
      </div>
      <div className={classes.item}>
        <Person className={classes.icon}/>Profile
      </div>
      <div className={classes.item}>
        <List className={classes.icon}/>Portfolios
      </div>
    
      <div className={classes.item}>
        <Bookmark className={classes.icon}/>Collections
      </div>
      <div className={classes.item}>
        <Storefront className={classes.icon}/>Market
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon}/>Logout
      </div>
    </Container>
  );
}

export default Leftbar;
