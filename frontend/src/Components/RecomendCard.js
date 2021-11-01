import {  Button,  Card,  Container,  IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@material-ui/core'
import { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const useStyles = makeStyles(theme => ({
  recomendCard: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    width:theme.spacing(16),
    height:theme.spacing(18),
    '&:hover': {
      boxShadow: theme.shadows[3],
    },
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    marginBottom:theme.spacing(1.2),
  },
  symbol:{
    width:'fit-content',
    padding:'0 6px',

    border:'1.3px solid ',
    borderRadius: '5px'
  },
  color: {
    backgroundColor: '#e1f2e7',
    padding: '4px 10px',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    color: 'green' ,
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
}))



export default function RecomendCard({data}) {
  const classes = useStyles({});

  return (
    <>
      {/* <Container> */}
      <Paper className={classes.recomendCard} variant='outlined'>
          <Typography variant='subtitle2' className={classes.symbol}>{data.symbol}</Typography>
          <Typography style={{font:'300 0.1em roboto'}} >{data.company}</Typography>
          <Typography variant='subtitle2' >{data.price}</Typography>

          <Typography variant='subtitle2' className={classes.buttonRow}>
            <div className={classes.color}>
              <ArrowUpwardIcon fontSize='small' />
              <Typography variant='subtitle2' >{data.changePercentage}</Typography>
            </div>
            <Tooltip title='Add To Portifolio'>
              <AddCircleOutlineIcon className={classes.Addicon} />
            </Tooltip>
          </Typography>
      </Paper>
      {/* </Container> */}
    </>
    
  )
}
