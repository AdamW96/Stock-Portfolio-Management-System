import {  Button,  IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@material-ui/core'
import { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  papers:{
    marginBottom:theme.spacing(3),
    width:"100%"
  },
  text:{
    fontFamily: 'Bungee',
    fontSize:theme.spacing(5),
    color:'#FF954A',
    marginLeft:theme.spacing(1),
  },
  color:{
    backgroundColor: props=>props.gainers ? '#e1f2e7' : '#fee5e3',
    padding:'3px 10px',
    borderRadius:theme.spacing(1),
    display:'flex',
    alignContent:'center',
    color:props=>props.gainers ? 'green':'#a50e0e',
    maxWidth:'fit-content'
  },
}))



export default function Performance({data,gainers}) {
  const classes = useStyles({gainers});
  return (
    <>
    <Paper  elevation={0} className={classes.papers}>
        <TableContainer component={Paper}>
          <div className={classes.text}>Gainers</div>
          <Table className={classes.table} size="small">
            <TableBody>
              {data.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell style={{width:'60%'}}>
                    <div className={classes.symbol} >
                      <Button>{stock.symbol}</Button>
                      {stock.company}
                    </div>
                  </TableCell>
                  <TableCell align="left">{stock.price}</TableCell>
                  <TableCell align="right">{stock.change}</TableCell>
                  <TableCell align="right" >
                    <div className={classes.color} >
                      {gainers ? <ArrowUpwardIcon fontSize='small'/> : <ArrowDownwardIcon fontSize='small'/>}
                      {stock.changePercentage}
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
    </>
    
  )
}
