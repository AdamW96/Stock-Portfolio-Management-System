import {  Button, Card, CardContent, Collapse, Container, Divider, IconButton, InputBase, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@material-ui/core'
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link } from 'react-router-dom';
// import Share from '../components/Share';
// import Post from '../components/Post';
const useStyles = makeStyles(theme => ({
  container:{
    paddingTop:theme.spacing(12),
    borderRight:'1px solid #ece7e7',
    height:'100vh',
  },
  search:{
    position:'relative',
    width:'100%',
    height:'12%',
    display:'flex',
    justifyContent:'center'
  },
  searchbar:{
    width:'70%',
    padding:theme.spacing(1),
    borderRadius:theme.spacing(5),
    marginBottom:theme.spacing(3),
    position:'absolute',
    zIndex:100

  },
  input:{
    display:'flex',
    alignItems:'center',
  },
  icon:{
    marginRight:theme.spacing(3),
    marginLeft:theme.spacing(2)
  },
  searchResults:{
    marginLeft:theme.spacing(3),
  },
  rows:{
    "&:hover":{
      backgroundColor:'#eef2f2',
      transition: "all 0.3s ease-out",
    }
  },
  tops:{
    marginBottom:theme.spacing(3),
    width:"100%"
  },
  text:{
    fontFamily: 'Bungee',
    fontSize:theme.spacing(5),
    color:'#FF954A',
    marginLeft:theme.spacing(1),
  },
  symbol:{
    // backgroundColor:'#e1f2e7',
    // display:'flex',
    // alignItems:'center',
    // color:'green',
    width:"100%",
    "&:hover":{
      cursor:'pointer'
    }
  },  
  rise:{
    backgroundColor:'#e1f2e7',
    padding:'3px 10px',
    borderRadius:theme.spacing(1),
    display:'flex',
    alignContent:'center',
    color:'green'
    // width:'50px',
    // height:'20px'
  },
  decline:{
    backgroundColor:'#fee5e3',
    padding:'3px 10px',
    borderRadius:theme.spacing(1),
    display:'flex',
    alignContent:'center',
    color:'#a50e0e'
  }
}))
const createData = (symbol, company, price, change, changePercentage) => {
  return { symbol, company, price, change, changePercentage };
}
const gainers = [
  createData('A26','Sinarmas Land Ltd', '$0.27', '5.88', '5.88%'),
  createData('UD3','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('A27','Sinarmas Land Ltd', '$0.27', '5.88', '5.88%'),
  createData('UD2','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('C09','City Developments Limited Fully Paid Ord. Shrs', '$9.72', '+5.88', '4.26%'),
];

const losers = [
  createData('NS8U','Hutchison Port Hldg Trust', '$0.27', '-8.43', '3.13%'),
  createData('J91U','ESR-REIT', '$13.47', '-2.12', '2.68%'),
  createData('NS9U','Hutchison Port Hldg Trust', '$0.27', '-8.43', '3.13%'),
  createData('J92U','ESR-REIT', '$13.47', '-2.12', '2.68%'),
  createData('E5H','Golden Agri-Resources Ltd', '$9.72', '-0.87', '1.89%'),
];

const FeedHomepage =({})=>{
  const classes = useStyles();
  const [userMenu, setUserMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <>
    <Container className={classes.container}>
      <div className={classes.search} >
        <Card  elevation={3} className={classes.searchbar} onClick={()=>setExpanded(!expanded)}>
          <div className={classes.input}>
            <SearchIcon className={classes.icon}/>
            <InputBase
              placeholder={"Search  for  stocks"}
            />
          </div>
          <Collapse in={expanded} className={classes.searchResults}>
              <TableContainer >
                <Table  size="small">
                  <TableBody>
                    {gainers.map((gainer) => (
                      <TableRow key={gainer.symbol} className={classes.rows}>
                        <TableCell style={{width:'60%'}} >
                          <Link to='' style={{textDecoration:'none',color:'#555'}}>
                            <div className={classes.symbol} >
                              <Typography variant='subtitle2'>{gainer.symbol}</Typography>
                              <Typography variant='caption'>{gainer.company}</Typography>
                            </div>
                          </Link>
                          
                        </TableCell>
                        {/* <TableCell align="left">{gainer.company}</TableCell> */}
                        <TableCell align="left">{gainer.price}</TableCell>

                        <TableCell align="right" >
                          <div className={classes.rise} >
                            <ArrowUpwardIcon fontSize='small'/>
                            {gainer.changePercentage}
                          </div>
                        </TableCell>
                      
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
      
              </TableContainer>
          </Collapse>
        </Card>
      </div>
      


      <Paper  elevation={0} className={classes.tops}>
        <TableContainer component={Paper}>
          <div className={classes.text}>Gainers</div>
          <Table className={classes.table} size="small">
            <TableBody>
              {gainers.map((gainer) => (
                <TableRow key={gainer.symbol}>
                  <TableCell style={{width:'60%'}}>
                    <div className={classes.symbol} >
                      <Button>{gainer.symbol}</Button>
               
                      {gainer.company}
                    </div>
                  </TableCell>
                  {/* <TableCell align="left">{gainer.company}</TableCell> */}
                  <TableCell align="left">{gainer.price}</TableCell>
                  <TableCell align="right">{gainer.change}</TableCell>
                  <TableCell align="right" >
                    <div className={classes.rise} >
                      <ArrowUpwardIcon fontSize='small'/>
                      {gainer.changePercentage}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title='Add To Portifolio'>
                      <IconButton ><AddCircleOutlineIcon/></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      </Paper>

      <Paper  elevation={0} className={classes.tops}>
        <TableContainer component={Paper}>
          <div className={classes.text}>Losers</div>
          <Table className={classes.table} size="small" >
            <TableBody>
            {losers.map((loser) => (
              <TableRow key={loser.symbol}>
                <TableCell style={{width:'60%'}}>
                  <div className={classes.symbol} >
                    <Button >{loser.symbol}</Button>
                    {loser.company}
                  </div>
                </TableCell>
                {/* <TableCell align="left">{loser.company}</TableCell> */}
                <TableCell align="left">{loser.price}</TableCell>
                <TableCell align="right">{loser.change}</TableCell>
                <TableCell align="right" >
                  <div className={classes.decline} >
                    <ArrowDownwardIcon fontSize='small'/>
                    {loser.changePercentage}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title='Add To Portifolio'>
                    <IconButton ><AddCircleOutlineIcon/></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Container>
    </>
  )
}

const FeedProtofolios = () => {
  const classes = useStyles();
  return (
    <>
    <Container className={classes.container}>
      FeedProtofolios
    </Container>
    </>
  )

}
const FeedStock = () => {
  const classes = useStyles();
  return (
    <>
    <Container className={classes.container}>
      FeedStock
    </Container>
    </>
  )

}


export default function Feed({stock,portfolio,homepage}) {
  return (
    <>
    {stock ? <FeedStock /> :'' }
    {portfolio ? <FeedProtofolios /> :'' }
    {homepage ? <FeedHomepage />:''}
    </>
    
  )
}

