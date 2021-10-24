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
      boxShadow: theme.shadows[2],
    },
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  color: {
    backgroundColor: props => props.gainers ? '#e1f2e7' : '#fee5e3',
    padding: '4px 10px',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
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
}))



export default function RecomendCard({data,gainers}) {
  const classes = useStyles({gainers});

  return (
    <>
      {/* <Container> */}
      <Paper className={classes.recomendCard} variant='outlined'>
          <Typography variant='subtitle2'>BABA</Typography>
          <Typography variant='caption' >Alibabas ssssssssssssssssss Group Holding Ltd</Typography>
          <Typography variant='subtitle2' >$177.42</Typography>

          <Typography variant='subtitle2' className={classes.buttonRow}>
            <div className={classes.color}>
              <ArrowUpwardIcon fontSize='small' />
              <Typography variant='subtitle2' >0.14%</Typography>
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
