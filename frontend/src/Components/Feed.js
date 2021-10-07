import { alpha, AppBar, Avatar, Badge, Card, Container, IconButton, InputBase, makeStyles, Menu, MenuItem, MenuList, Toolbar, Typography } from '@material-ui/core'
import { Chat, Mail, Notifications, Search } from '@material-ui/icons'
import { useState } from 'react';
// import Share from '../components/Share';
// import Post from '../components/Post';
const useStyles = makeStyles(theme => ({
  container:{
    paddingTop:theme.spacing(12),
    borderRight:'1px solid #ece7e7'
  }
}))

export default function Feed() {
  const classes = useStyles();
  const [userMenu, setUserMenu] = useState(false);
  return (
    <Container className={classes.container}>
      feed

    </Container>
    
  )
}

