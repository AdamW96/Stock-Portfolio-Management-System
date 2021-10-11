import {  Card, CardContent, Collapse, Container, Divider, IconButton, InputBase, makeStyles, Menu, MenuItem, MenuList, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core'
import { Add  } from '@material-ui/icons'
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';


// import Share from '../components/Share';
// import Post from '../components/Post';
const useStyles = makeStyles(theme => ({
  container:{
    paddingTop:theme.spacing(12),
    borderRight:'1px solid #ece7e7',
    height:'100vh'
  },
  searchbar:{
    width:'80%',

    padding:theme.spacing(2),
    borderRadius:theme.spacing(5),
    marginBottom:theme.spacing(3),
  },
  input:{
    display:'flex',
    alignItems:'center',
  },

  icon:{
    marginRight:theme.spacing(5),
    marginLeft:theme.spacing(5)
  },
  searchResults:{
    marginLeft:theme.spacing(3)
  },
  tops:{
    marginBottom:theme.spacing(5),
  },
  text:{
    fontFamily: 'Bungee',
    fontSize:theme.spacing(7),
    color:'#FF954A',
    marginLeft:theme.spacing(1),
  }
}))
const createData = (symbol, company, price, change, changePercentage) => {
  return { symbol, company, price, change, changePercentage };
}
const gainers = [
  createData('A26','Sinarmas Land Ltd', '$0.27', '+5.88', '+5.88%'),
  createData('UD2','Japfa Ltd', '$13.47', '+2.12', '+4.68%'),
  createData('C09','City Developments Limited Fully Paid Ord. Shrs', '$9.72', '+5.88', '+4.26%'),

];

const losers = [
  createData('NS8U','Hutchison Port Hldg Trust', '$0.27', '-8.43', '-3.13%'),
  createData('J91U','ESR-REIT', '$13.47', '-2.12', '-2.68%'),
  createData('E5H','Golden Agri-Resources Ltd', '$9.72', '-0.87', '-1.89%'),

];

export default function Feed() {
  const classes = useStyles();
  const [userMenu, setUserMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <Container className={classes.container}>
      <Card  elevation={5} className={classes.searchbar}>
        <div className={classes.input}>
        <SearchIcon className={classes.icon}/>
        <InputBase
          className={classes.input}
          placeholder="Search  for  stocks"
        />
        </div>
        <Collapse in={expanded} className={classes.searchResults}>
            <CardContent>
              <Divider />
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
            </CardContent>
        </Collapse>
      </Card>
      


      <Paper  elevation={1} className={classes.tops}>
        <TableContainer component={Paper}>
        <Table className={classes.table} >
          <TableHead>
            <h1 className={classes.text}>Gainers</h1>
          </TableHead>
          <TableBody>
            {gainers.map((gainer) => (
              <TableRow >
                <TableCell >
                  {gainer.symbol}
                </TableCell>
                <TableCell align="left">{gainer.company}</TableCell>
                <TableCell align="left">{gainer.price}</TableCell>
                <TableCell align="right">{gainer.change}</TableCell>
                <TableCell align="right">{gainer.changePercentage}</TableCell>
                <TableCell align="right"><IconButton ><Add/></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>

      <Paper  elevation={1} className={classes.tops}>
        <TableContainer component={Paper}>
          <Table className={classes.table} >
            <TableHead>
              <h1 className={classes.text}>Losers</h1>
            </TableHead>
            <TableBody>
            {losers.map((loser) => (
              <TableRow >
                <TableCell >
                  {loser.symbol}
                </TableCell>
                <TableCell align="left">{loser.company}</TableCell>
                <TableCell align="left">{loser.price}</TableCell>
                <TableCell align="right">{loser.change}</TableCell>
                <TableCell align="right">{loser.changePercentage}</TableCell>
                <TableCell align="right"><IconButton ><Add/></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Container>
    
  )
}

