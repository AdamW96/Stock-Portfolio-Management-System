import React from 'react'
import { alpha, AppBar, Container, Avatar, Button, Badge, IconButton, InputBase, makeStyles, Menu, MenuItem, MenuList, Toolbar, Typography, Box, Tooltip, Modal, Paper } from '@material-ui/core'
import { Chat, Mail, Notifications, Search } from '@material-ui/icons'
import { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
const styles = makeStyles(theme => ({
  nav:{
    backgroundColor:'#f1f0ed',
    padding:'0 12.5%'
  },
  tool:{
    display:'flex',
    justifyContent:'space-between'
  },
  msgModal:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  msgContent:{
    height:'40%',
    width:'35%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
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
    marginLeft: theme.spacing(2),
  },
}))


export default function Navigation() {
  const classes = styles()
  const [userMenu, setUserMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMsg,setOpenMsg] = useState(false);

  const menuClick = (e) => {
    setUserMenu(e.currentTarget);
  }

  const menuClose  = (r) => {
    if (r === 'clickaway') {
      return;
    }
    setUserMenu(false);
  };

  return (
    <AppBar className={classes.nav} >
      <Toolbar className={classes.tool}>
        <div className="logo">
          <Link to='/' >
          <img src="images/final-logo.png" alt=""  style={{width:'130px'}}/>
          </Link>
        </div>


        <div className={classes.items}>
          <Tooltip title="Message" >
            <IconButton className={classes.iconbuttons} onClick={()=>setOpenMsg(true)}>
                <Badge badgeContent={1} color='error' >
                  <Mail fontSize='medium'/>
                </Badge>
              </IconButton>
          </Tooltip>

          <Modal open={openMsg} onClose={()=>setOpenMsg(false)} className={classes.msgModal}>
            <Paper className={classes.msgContent} >
              <Typography className={classes.headText}>Hellooooooo!</Typography>
              <Typography className={classes.headText}>Welcome to our fiance website.</Typography>
              {/* <Typography className={classes.headText}>Hope you like it~ </Typography> */}
              <img src='images/unsw.png' alt=''  style={{height:'17%', borderRadius:'20%'}}/>
        
              
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

          




          <IconButton className={classes.iconbuttons} onClick={menuClick} >
            <Avatar src='./images/person/1.jpeg' style={{ height: 45, width: 45 }} />
          </IconButton>
          <Menu
            // keepMounted
            anchorEl={userMenu}
            open={userMenu}
            onClose={menuClose}
          >
            <MenuItem onClick={()=>setUserMenu(false)}>Profile</MenuItem>
            <MenuItem onClick={()=>setUserMenu(false)}>My account</MenuItem>
            <MenuItem onClick={()=>setUserMenu(false)}>Logout</MenuItem>
          </Menu>


        </div>



        

      </Toolbar>
    </AppBar>
  )
}
