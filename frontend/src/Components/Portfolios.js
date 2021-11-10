import React from 'react'
import {
  Container,
  Typography,
  Paper,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Backdrop,
  Fade,
  TextField,
  makeStyles,
} from '@material-ui/core'
import ListRoundedIcon from '@material-ui/icons/ListRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import portfolioService from '../services/portfolio-service'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    height: '100vh',
  },
  headText: {
    fontFamily: 'Bungee',
    fontSize: theme.spacing(4),
    color: '#FF954A',
    marginLeft: theme.spacing(1),
  },
  text: {
    fontFamily: 'Bungee',
    marginLeft: theme.spacing(1),
  },
  listItem: {
    border: '1px solid #5d5d5d',
    borderRadius: 5,
    marginBottom: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
  modalLine:{
    marginBottom:theme.spacing(2)
  }
  // portList: {
  //   display: 'flex',
  //   marginBottom: theme.spacing(5),
  // },
  // portButton: {
  //   padding: '0px 5px 0px 5px',
  //   width: 'fit-content',
  //   borderBottom: '3px solid #555',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   borderRadius: '4px',
  //   marginLeft: theme.spacing(2),
  //   '&:hover': {
  //     boxShadow: theme.shadows[3],
  //     cursor: 'pointer',
  //   },
  // },
  // portText: {
  //   fontFamily: 'Bungee',
  //   marginLeft: theme.spacing(0.5),
  //   fontSize: theme.spacing(1),
  // },

  // icon: {
  //   backgroundColor: '#eef1f2',
  //   padding: '0 3px 0px 0px',
  //   borderRadius: '4px',
  // },
  // addButton: {
  //   marginLeft: 'auto',
  // },
  // portContent: {
  //   padding: theme.spacing(2),
  //   width: '100%',
  // },
  // portContentInfo: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: theme.spacing(2),
  // },
}))

export default function Portfolios(props) {
  const classes = useStyles()
  const [portNum, setPortNum] = React.useState(1)
  const [portfolios, setPortfolios] = React.useState([])
  const [openAddNew, setOpenAddNew] = React.useState(false)
  const [newPortName, setNewPortName] = React.useState('')
  const [newPortDes, setNewPortDes] = React.useState('')
  const [getPorts, setGetPorts] = React.useState(false)
  const { currentUser, setCurrentUser, setShowAlert } = props

  const showAlert = (type, content) => {
    window.alert = true
    console.log(setShowAlert)
    setShowAlert({alertType:type,alertContent:content})
  }

  const handleOpenAddNew = () => {
    setOpenAddNew(true)
  }
  const handleCloseAddNew = () => {
    setOpenAddNew(false)
  }

  React.useEffect(() => {
    console.log(currentUser)
    portfolioService.getAll().then((response) => {
      console.log(response.data)
      if (response.data.code === 200) {
        setPortfolios(response.data.data)
      }
    })
  }, [getPorts])

  const handleNewPortName = (e) => {
    setNewPortName(e.target.value)
  }

  const handleNewPortDes = (e) => {
    setNewPortDes(e.target.value)
  }

  const submitNewPort = () => {
    const data = {pName:newPortName,description:newPortDes}
    portfolioService.createNew(data).then(response=>{
      console.log(response)
      if(response.data.code!==200) {
        showAlert('error','You have same name portfolio, change a new name')
        return 
      }
      handleCloseAddNew()
      showAlert('success','New portfolio has been created')
      setGetPorts(preState=>!preState)
    })
  }

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Container>
          <Typography className={classes.headText} gutterBottom>
            Total Gain/Loss
          </Typography>
          <Typography variant='h5' className={classes.text} gutterBottom>
            +$63.2
          </Typography>
        </Container>
        <Container>
          <Typography className={classes.headText} gutterBottom>
            My Portfolios
          </Typography>

          <Button
            className={classes.addButton}
            color='primary'
            onClick={handleOpenAddNew}
          >
            <AddRoundedIcon fontSize='small' />
            <Typography className={classes.portText}>New</Typography>
          </Button>

          <List component='nav' aria-label='secondary mailbox folders'>
            {portfolios.length !== 0 &&
              portfolios.map((ele, index) => {
                return (
                  <React.Fragment>
                    <ListItem button id={ele.pid} className={classes.listItem}>
                      <ListItemText
                        className={classes.headText}
                        primary={ele.pName}
                        secondary={ele.description}
                      />
                    </ListItem>
                  </React.Fragment>
                )
              })}
            {portfolios.length === 0 && (
              <div className={classes.headText}>No Portfolio</div>
            )}
          </List>
        </Container>
      </Container>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openAddNew}
        onClose={handleCloseAddNew}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAddNew}>
          <div className={classes.modalPaper}>
            <h1>Create a new portfolio</h1>
            <div className={classes.modalLine}>
              <TextField
                label='Portfolio name'
                variant="outlined"
                value={newPortName}
                onChange={handleNewPortName}
              />
            </div>
            <div className={classes.modalLine}>
              <TextField
                label='Description'
                multiline
                variant="outlined"
                rows={4}
                value={newPortDes}
                onChange={handleNewPortDes}
              />
            </div>
            <div className="modalButton">
              <Button color='primary' onClick={submitNewPort}>Submit</Button>
              <Button color='secondary' onClick={handleCloseAddNew}>Cancel</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

{
  /* <Paper variant='outlined' className={classes.portContent}>
<Typography className='portContentHeader' variant='subtitle2'>
  Portfolio1
  <Tooltip title='Rename'>
    <CreateOutlinedIcon className={classes.addButton} />
  </Tooltip>
  <Tooltip title='Delete'>
    <DeleteOutlinedIcon className={classes.addButton} />
  </Tooltip>
  <Tooltip title='Add To Portifolio'>
    <AutorenewIcon className={classes.addButton} />
  </Tooltip>
</Typography>
<Container className={classes.portContentInfo}>
  <img src='images/empty.png' alt='' style={{ width: '27%' }} />
  <Typography variant='subtitle2'>
    Nothing in this portfolio
  </Typography>
  <Button color='primary'>
    <AddRoundedIcon fontSize='small' />
    <Typography className={classes.portText}>
      Add investments
    </Typography>
  </Button>
</Container>
</Paper> */
}
