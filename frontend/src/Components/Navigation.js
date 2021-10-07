import React from 'react'
import { alpha, AppBar, Avatar, Button, Badge, IconButton, InputBase, makeStyles, Menu, MenuItem, MenuList, Toolbar, Typography } from '@material-ui/core'
import { Chat, Mail, Notifications, Search } from '@material-ui/icons'
import { useState } from 'react';


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
          <IconButton className={classes.iconbuttons}>
            <Badge badgeContent={4} color="secondary" size='small'>
              <Mail />
            </Badge>
          </IconButton>

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
