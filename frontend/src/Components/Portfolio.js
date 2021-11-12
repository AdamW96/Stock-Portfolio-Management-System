import React, { useState } from 'react'
import {
  Grid,
  Container,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import AuthService from "../services/auth-service";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    // borderRight:'1px solid #ece7e7',
    height: '100vh',
  },
  headText: {
    fontFamily: 'Bungee',
    fontSize: theme.spacing(4),
    color: '#FF954A',
    marginLeft: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Portfolio() {
  const classes = useStyles()
  const [portGain, setPortGain] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  
  const handleChangeTab= (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.headText}>
              Gain of current portfolio:
            </Typography>
            <Typography className={classes.headText}>{portGain}</Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.root}>
              <AppBar position='static'>
                <Tabs
                  value={tabValue}
                  onChange={handleChangeTab}
                  aria-label='simple tabs example'
                >
                  <Tab label='Item One' {...a11yProps(0)} />
                  <Tab label='Item Two' {...a11yProps(1)} />
                  <Tab label='Item Three' {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel1 value={value} index={0}>
                Item One
              </TabPanel1>
              <TabPanel2 value={value} index={1}>
                Item Two
              </TabPanel2>
              <TabPanel3 value={value} index={2}>
                Item Three
              </TabPanel3>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
