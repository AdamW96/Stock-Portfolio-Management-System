import React from 'react'
import { AppBar , Button, Badge, IconButton,  makeStyles, Toolbar, Typography, Tooltip, Modal, Paper } from '@material-ui/core'
import { Mail } from '@material-ui/icons'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useHistory } from "react-router";
const styles = makeStyles(theme => ({
  nav: {
    backgroundColor: '#f1f0ed',
    padding: '0 12.5%'
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  msgModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContent: {
    height: '40%',
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000',
  },
  headText: {
    fontFamily: "Bungee",
    fontSize: theme.spacing(4),
    color: "#FF954A",
    marginLeft: theme.spacing(1),
  },
  text: {
    fontFamily: "Bungee",
    fontSize: theme.spacing(1),
    // marginLeft: theme.spacing(2),
  },
  items: {
    display: 'flex',
    alignItems: 'center'
  },
  signButton: {
    borderRadius: theme.spacing(1),
  },
  registerButton: {
    borderRadius: theme.spacing(1),
    marginLeft: theme.spacing(1),
    borderColor: theme.palette.success.light,
    color: theme.palette.success.main,
    "&:hover": {
      color: theme.palette.success.dark,
    },
  }
}))


export default function Navigation() {
  const classes = styles();
  const history = useHistory();
  const [openMsg, setOpenMsg] = useState(false);
  const loginState = useSelector(state => state.loginState);

  return (
    <AppBar className={classes.nav} >
      <Toolbar className={classes.tool}>
        <div className="logo">
          <Link to='/' >
            <img src="images/final-logo.png" alt="" style={{ width: '130px' }} />
          </Link>
        </div>


        <div className={classes.items}>

          {loginState && (
            <>
              <Tooltip title="Message" >
                <IconButton className={classes.iconbuttons} onClick={() => setOpenMsg(true)}>
                  <Badge badgeContent={1} color='error' >
                    <Mail fontSize='medium' />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Modal open={openMsg} onClose={() => setOpenMsg(false)} className={classes.msgModal}>
                <Paper className={classes.msgContent} >
                  <Typography className={classes.headText}>Hellooooooo!</Typography>
                  <Typography className={classes.headText}>Welcome to our finance website.</Typography>
                  {/* <Typography className={classes.headText}>Hope you like it~ </Typography> */}
                  <img src='images/unsw.png' alt='' style={{ height: '17%', borderRadius: '20%' }} />


                  <Typography className={classes.text} gutterBottom></Typography>
                  <Typography className={classes.text} gutterBottom>By Group 9900-W16A-NoBugs</Typography>
                  <Typography className={classes.text}>Fei Xu</Typography>
                  <Typography className={classes.text}>Zhao Wang</Typography>
                  <Typography className={classes.text}>Kawing Wan</Typography>
                  <Typography className={classes.text}>ChengRui Wang</Typography>
                  <Typography className={classes.text} gutterBottom>PengYu Wang</Typography>
                  <Typography className={classes.headText}>Demo B</Typography>
                </Paper>
              </Modal>
            </>
          )}

          {!loginState && (
            <div className={classes.buttons}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push("/register");
                }}
                className={classes.signButton}
              >
                <div className={classes.text}>Sign Up</div>
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  history.push("/signin");
                }}
                className={classes.registerButton}
              >
                <div className={classes.text}>Sign In</div>
              </Button>

            </div>
          )}




        </div>


      </Toolbar>
    </AppBar>
  )
}
