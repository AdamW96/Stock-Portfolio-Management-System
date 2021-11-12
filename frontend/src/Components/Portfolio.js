import React, { useState } from 'react'
import { useLocation } from 'react-router'
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
import portfolioService from '../services/portfolio-service'
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
  tabPanel:{
    padding:theme.spacing(2)
  }
}))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Portfolio(props) {
  const classes = useStyles()
  const location = useLocation()
  const [portGain, setPortGain] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [fetchData, setFetchData] = useState(false)
  const { allStocks } = props
  React.useEffect(()=>{
    const pid = location.pathname.split('/')[2]
    portfolioService.portGain(pid).then(response=>{
      console.log(response)
    })
  },[fetchData])

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.headText}>Gain:</Typography>
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
              {/* show all stocks you have bought */}
              {tabValue === 0 && (
                <Grid container className={classes.tabPanel}>
                  <Typography> this is one</Typography>
                </Grid>
              )}
              {tabValue === 1 && (
                <Grid container className={classes.tabPanel}>
                  <Typography> this is two</Typography>
                </Grid>
              )}
              {tabValue === 2 && (
                <Grid container className={classes.tabPanel}>
                  <Typography> this is three</Typography>
                </Grid>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
