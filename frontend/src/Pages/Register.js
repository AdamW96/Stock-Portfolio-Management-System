import React from 'react'
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { useState } from 'react';

const usestyles = makeStyles((theme) => ({
  login:{
    height:'100vh',
    paddingLeft:"10.5%",
    paddingRight:"14.5%",
    display:'flex',
    alignItems:'center',
    backgroundColor:"#f0f2f5"
  },
  loginWarpper:{
    height:'70%',
    display:'flex',
    alignItems:'center',
  },
  welcome:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  welcomeText:{
    fontSize:'130px',
    fontWeight:800,
    color:theme.palette.primary.main
  },
  signForm:{
    padding:'5% 0',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  logo:{
    marginBottom:theme.spacing(2),
  },
  userInfo:{
    width:'80%',
    marginBottom:theme.spacing(2),
    borderRadius:theme.spacing(2),
  },
  signButton:{
    width:'80%',
    height:theme.spacing(7),
    borderRadius:theme.spacing(1),
    fontSize:'17px',
    marginBottom:theme.spacing(2),
  },
  registerButton:{
    width:'50%',
    height:theme.spacing(7),
    borderRadius:theme.spacing(1),
    fontSize:'17px',
    backgroundColor:theme.palette.success.main,
    marginTop:theme.spacing(2),
  }

}))

export default function Register() {
  const classes = usestyles()
  return (
    <div className={classes.login}>

      <Grid container className={classes.loginWarpper}>
          <Grid item sm={6} xs={6}>
            <Container className={classes.welcome}>
              <Typography variant='h1' className={classes.welcomeText} >Nbfinance</Typography>
              <Typography variant='body2'>
                Everyone can become a stock portfolio expert on NBfinance.
              </Typography>
            </Container>
          </Grid>

          <Grid item sm={6} xs={6}>
          <Container >
              <Paper elevation={3} className={classes.signForm}> 
                <img src='images/logo.png' alt='' className={classes.logo}/>
                <TextField label="Email" type="email" variant="outlined" className={classes.userInfo}/>
                <TextField label="Username" variant="outlined" className={classes.userInfo}/>
                <TextField label="Password" type="password" variant="outlined" className={classes.userInfo}/>
                <TextField label="Confirm your password" type="password" variant="outlined" className={classes.userInfo}/>
                <Button variant="contained" color="primary" href="" className={classes.signButton}>
                  Sign up
                </Button>
                <Typography variant='body2'>Already have an account?</Typography>
                
                <Button variant="contained" color="primary" href="" className={classes.registerButton}>
                  Sign in
                </Button>
              </Paper>
            </Container>
          </Grid>
      </Grid>

    </div>

  )
}
