import { alpha, AppBar, Avatar, Badge, IconButton, InputBase, makeStyles, Menu, MenuItem, MenuList, Toolbar, Typography } from '@material-ui/core'
import { Chat, Mail, Notifications, Search } from '@material-ui/icons'
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  sad:{
    paddingTop:theme.spacing(12)
  }
}))

export default function Right() {
  const classes = useStyles();
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className={classes.sad}>
      rightbar
    </div>
  )
}
