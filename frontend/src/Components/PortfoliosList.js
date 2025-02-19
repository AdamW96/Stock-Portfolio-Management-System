import React from 'react'
import { useHistory } from 'react-router'
import {
  Container,
  Typography,
  Button,
  Grid,
  Modal,
  Backdrop,
  Fade,
  TextField,
  IconButton,
  makeStyles,
} from '@material-ui/core'
// import ListRoundedIcon from '@material-ui/icons/ListRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import DeleteIcon from '@material-ui/icons/Delete'
// import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
// import AutorenewIcon from '@material-ui/icons/Autorenew'
import portfolioService from '../services/portfolio-service'
import CreateIcon from '@material-ui/icons/Create'
import allGainService from '../services/allGain-service'
import { Empty } from 'antd'
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    height: '100vh',
  },
  headText: {
    fontFamily: 'Bungee',
    fontSize: '1.3rem',
    color: '#FF954A',
  },
  text: {
    fontFamily: 'Bungee',
    marginLeft: '0.5rem',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  listItem: {
    border: '1px solid #5d5d5d',
    borderRadius: 5,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  listItemHead: {
    fontSize: theme.spacing(3),
  },
  listItemDes: {
    fontSize: theme.spacing(1),
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
  modalLine: {
    marginBottom: theme.spacing(2),
  },
  portfolioBody: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  positive:{
    color:'green'
  },
  negative:{
    color:'red'
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

export default function PortfoliosList(props) {
  const classes = useStyles()
  const history = useHistory()
  const [portNum, setPortNum] = React.useState(1)
  const [portfolios, setPortfolios] = React.useState([])
  const [openAddNew, setOpenAddNew] = React.useState(false)
  const [openEditName, setOpenEditName] = React.useState(false)
  const [openDelete, setOpenDlete] = React.useState(false)
  const [newPortName, setNewPortName] = React.useState('')
  const [newPortDes, setNewPortDes] = React.useState('')
  const [newName, setNewName] = React.useState('')
  const [getPorts, setGetPorts] = React.useState(false)
  const { currentUser, setCurrentUser, setShowAlert } = props
  const [allGain, setAllGain] = React.useState(0)
  const showAlert = (type, content) => {
    window.alert = true
    setShowAlert({ alertType: type, alertContent: content })
  }

  const handleOpenAddNew = () => {
    setOpenAddNew(true)
  }
  const handleCloseAddNew = () => {
    setOpenAddNew(false)
  }

  const handleOpenEditName = (e) => {
    console.log(e.currentTarget)
    window.oldName = e.currentTarget.name.split('#')[0]
    window.currentPid = e.currentTarget.name.split('#')[1]
    setOpenEditName(true)
  }
  const handleCloseEditName = (e) => {
    setOpenEditName(false)
  }

  const handleOpenDelete = (e) => {
    window.oldName = e.currentTarget.name.split('#')[0]
    setOpenDlete(true)
  }
  const handleCloseDelete = () => {
    setOpenDlete(false)
  }

  React.useEffect(() => {
    portfolioService.getAll().then((response) => {
      if (response.data.code === 200) {
        let rawPorts = response.data.data
        let finalPorts = []
        for (let i = 0; i < rawPorts.length; i++) {
          portfolioService.portGain(rawPorts[i].pid).then((response) => {
            if (response.data.code === 200) {
              rawPorts[i].gain = response.data.data.toFixed(2)
            } else {
              rawPorts[i].gain = 0
            }
            finalPorts.push(rawPorts[i])
            if (finalPorts.length === rawPorts.length) {
              setPortfolios(finalPorts)
            }
          })
        }
      } else {
        setPortfolios([])
      }
    })
    allGainService.getAllGain().then((res) => setAllGain(res.data.data))
  }, [getPorts])

  React.useEffect(()=>{
    console.log(portfolios)
  },[portfolios])

  const handleNewPortName = (e) => {
    setNewPortName(e.target.value)
  }

  const handleNewPortDes = (e) => {
    setNewPortDes(e.target.value)
  }
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const submitNewPort = () => {
    if (newPortName.length === 0) {
      showAlert('error', "You can't use empty name")
      return
    }
    const data = { pName: newPortName, description: newPortDes }
    portfolioService.createNew(data).then((response) => {
      console.log(response)
      if (response.data.code !== 200) {
        showAlert('error', 'You have same name portfolio, change a new name')
        return
      }
      handleCloseAddNew()
      showAlert('success', 'New portfolio has been created')
      setGetPorts((preState) => !preState)
    })
  }

  const submitRename = () => {
    if (window.oldName === newName) {
      showAlert('error', "You can't change a same name")
      return
    }
    const data = { newName, oldName: window.oldName }
    portfolioService.reName(data).then((response) => {
      console.log(response)
      if (response.data.code !== 200) {
        showAlert('error', 'Something wrong')
        return
      }
      showAlert('success', 'Change name successfully')
      setGetPorts((preState) => !preState)
      handleCloseEditName()
    })
  }

  const submitDelete = () => {
    const data = { pName: window.oldName }
    portfolioService.deletePort(data).then((response) => {
      if (response.data.code !== 200) {
        showAlert('error', 'Something wrong')
        return
      }
      showAlert('success', 'Delete successfully')
      setGetPorts((preState) => !preState)
      handleCloseDelete()
    })
  }

  const jumpToSinglePort = (e) => {
    console.log(e.currentTarget)
    const pid = e.currentTarget.getAttribute('name')
    history.push(`/portfolio/${pid}`)
  }

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Container>
          <Typography className={classes.headText} gutterBottom>
            Total Gain/Loss
          </Typography>
          {allGain ? (
            <Typography
              style={{
                fontSize: '3rem',
                fontFamily: 'Bungee',
                marginLeft: '1rem',
              }}
              gutterBottom
            >
              $ {allGain.toFixed(2)}
            </Typography>
          ) : (
            <Typography className={classes.text} gutterBottom>
              Make your stock profolios now ⬇️
            </Typography>
          )}
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
            <Typography>New</Typography>
          </Button>

          <Grid container aria-label='secondary mailbox folders'>
            {portfolios.length !== 0 &&
              portfolios.map((ele) => {
                return (
                  <React.Fragment key={ele.pName}>
                    <Grid container className={classes.listItem}>
                      <Grid
                        item
                        xs={8}
                        className={classes.portfolioBody}
                        name={ele.pid}
                        onClick={jumpToSinglePort}
                      >
                        <Typography variant='h5'>{ele.pName}</Typography>
                        <Typography variant='h6'>{ele.description}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant='h5'>Gain:</Typography>
                        {ele.gain >= 0 && (
                          <Typography variant='h5' className={classes.positive}>{ele.gain}</Typography>
                        )}
                        {ele.gain < 0 && (
                          <Typography variant='h5' className={classes.negative}>{ele.gain}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          name={`${ele.pName}#${ele.pid}`}
                          onClick={handleOpenEditName}
                        >
                          <CreateIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          name={`${ele.pName}#${ele.pid}`}
                          onClick={handleOpenDelete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )
              })}
            {portfolios.length === 0 && (
              <Empty description='⬆️  Create your first Portfolio' />
            )}
          </Grid>
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
                variant='outlined'
                value={newPortName}
                onChange={handleNewPortName}
              />
            </div>
            <div className={classes.modalLine}>
              <TextField
                label='Description'
                multiline
                variant='outlined'
                rows={4}
                value={newPortDes}
                onChange={handleNewPortDes}
              />
            </div>
            <div className='modalButton'>
              <Button color='primary' onClick={submitNewPort}>
                Submit
              </Button>
              <Button color='secondary' onClick={handleCloseAddNew}>
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openEditName}
        onClose={handleCloseEditName}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditName}>
          <div className={classes.modalPaper}>
            <h1>Change portfolio name</h1>
            <div className={classes.modalLine}>
              <Typography variant='h5'>Old name:</Typography>
              <Typography variant='h6'>{window.oldName}</Typography>
            </div>
            <div className={classes.modalLine}>
              <TextField
                label='New name'
                variant='outlined'
                onChange={handleNewName}
              />
            </div>
            <div className='modalButton'>
              <Button
                name={window.currentPid}
                color='primary'
                onClick={submitRename}
              >
                Submit
              </Button>
              <Button color='secondary' onClick={handleCloseEditName}>
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDelete}>
          <div className={classes.modalPaper}>
            <h1>Delete this portfolio?</h1>
            <div className='modalButton'>
              <Button color='primary' onClick={submitDelete}>
                Yes
              </Button>
              <Button color='secondary' onClick={handleCloseDelete}>
                Cancel
              </Button>
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
