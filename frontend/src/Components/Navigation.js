import React from 'react'
import { alpha, AppBar, Avatar, Button, Badge, IconButton, InputBase, makeStyles, Menu, MenuItem, MenuList, Toolbar, Typography, Box, Tooltip } from '@material-ui/core'
import { Chat, Mail, Notifications, Search } from '@material-ui/icons'
import { useState } from 'react';
import Popover from '@material-ui/core/Popover';

const styles = makeStyles(theme => ({
  nav:{
    backgroundColor:'#f1f0ed',
    padding:'0 12.5%'
  },
  tool:{
    display:'flex',
    justifyContent:'space-between'
  }

  
  
}))

export default function Navigation() {
  const classes = styles()
  const [userMenu, setUserMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
          <Button>
            <img src="images/final-logo.png" alt=""  style={{width:'130px'}}/>
          </Button>
        </div>

        <div className={classes.items}>
          <Tooltip title="Message" >
            <IconButton className={classes.iconbuttons} >
                <Badge badgeContent={1} color='error' >
                  <Mail fontSize='medium'/>
                </Badge>
              </IconButton>
          </Tooltip>




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
