import {  Button,  Card,  Container,  IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@material-ui/core'
import { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  table:{
    marginBottom:theme.spacing(3),
    // width:"100%"
  },
  text:{
    fontFamily: 'Bungee',
    fontSize:theme.spacing(4),
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
  rows:{
    "&:hover":{
      backgroundColor:'#eef2f2',
      transition: "all 0.3s ease-out",
      cursor:'pointer'
    }
  },
}))



export default function Performance({data,gainers}) {
  const classes = useStyles({gainers});

  return (
    <>
      {/* <Container> */}
      <TableContainer className={classes.table} >
        <div className={classes.text}>{gainers ? 'Gainers' :'Losers'}</div>
        <Table className={classes.table} size="small" >
          <TableBody>
            {data.map((stock) => (
              <TableRow key={stock.symbol} className={classes.rows} >
                <TableCell style={{width:'60%'}}>
                  <div >

                    <Typography variant='subtitle2'>{stock.symbol}</Typography>
                    <Typography variant='caption'>{stock.company}</Typography>
                    {/* <Button>{stock.symbol}</Button>
                    {stock.company} */}
                  </div>
                </TableCell>
                <TableCell align="left" >{stock.price}</TableCell>
                <TableCell align="right" >{stock.change}</TableCell>
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
      {/* </Container> */}
    </>
    
  )
}
