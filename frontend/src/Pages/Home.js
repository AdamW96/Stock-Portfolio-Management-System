import React from 'react'
import Navigation from '../Components/Navigation'
import Left from '../Components/Left'
import Right from '../Components/Right'
import Feed from '../Components/Feed'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const styles = makeStyles((theme) => ({
  container:{
    paddingLeft:"12.5%",
    paddingRight:"12.5%",
  }
  
}))

export default function Home() {
  const classes = styles()
  return (
    <div>
      <Navigation />

      <Grid container className={classes.container}>
          <Grid item sm={2} >
            <Left />
          </Grid>

          <Grid item sm={7} >
            <Feed />
          </Grid>

          <Grid item sm={3} >
            <Right />
          </Grid>
      </Grid>

    </div>

  )
}
