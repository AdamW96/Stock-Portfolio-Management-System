import React, { useState } from 'react'
import { useLocation } from 'react-router'
import {
  Grid,
  Container,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Button,
  TextField,
  Modal,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import portfolioService from '../services/portfolio-service'
// import AuthService from "../services/auth-service";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    // borderRight:'1px solid #ece7e7',
    height: '100vh',
    // overflow:'scroll'
  },
  stockHolder: {
    // overflow:'auto'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  headText: {
    fontFamily: 'Bungee',
    fontSize: '2.5rem',
    color: '#FF954A',
    marginLeft: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    padding: theme.spacing(2),
  },
  showPart: {
    paddingTop: theme.spacing(2),
  },
  subTitle: {
    marginBottom: theme.spacing(2),
  },
  singleStock: {
    border: '1px solid #5d5d5d',
    borderRadius: 5,
    padding: 0,
    marginBottom: theme.spacing(2),
  },
  buyNewButton: {
    marginRight: theme.spacing(2),
  },
  positiveRate: {
    color: '#00873c',
  },
  negativeRate: {
    color: '#eb0f29',
  },
}))

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function changeTimeFormate(value) {
  const date = new Date(value)
  let str = ''
  const y = date.getFullYear()
  const m =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  str = `${y}-${m}-${d}`
  return str
}

export default function Portfolio(props) {
  const classes = useStyles()
  const location = useLocation()
  const [modalStyle] = useState(getModalStyle)
  const [openBuy, setOpenBuy] = React.useState(false)
  const [portGain, setPortGain] = useState(0)
  const [tabValue, setTabValue] = useState(0)
  const [fetchData, setFetchData] = useState(false)
  const [searchStock, setSearchStock] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [buyLot, setBuyLot] = useState('')
  const [buyDate, setBuyDate] = useState('')
  const [stocks, setStocks] = useState([])
  const [realTimeStocks, setRealTimeStocks] = useState([])
  const [profitStocks, setProfitStocks] = useState([])
  const { allStocks, setShowAlert } = props
  const pid = location.pathname.split('/')[2]
  const showAlertMsg = (type, content) => {
    window.alert = true
    setShowAlert({ alertType: type, alertContent: content })
  }

  const setUsedStockList = (list) => {
    const result = []
    list.forEach((ele, index) => {
      for (let i = 0; i < allStocks.length; i++) {
        if (ele.sid === allStocks[i].sid) {
          ele.enname = allStocks[i].enname
          ele.tsCode = allStocks[i].tsCode
          result.push(ele)
          break
        }
      }
    })
    return result
  }

  React.useEffect(() => {
    portfolioService.portGain(pid).then((response) => {
      if (response.data.code === 200) {
        const number = response.data.data.toFixed(2)
        setPortGain(number)
      }
    })

    portfolioService.getAllStocks(pid).then((response) => {
      if (response.data.code === 200) {
        setStocks(setUsedStockList(response.data.data))
      }
    })
  }, [fetchData])

  React.useEffect(() => {
    console.log('this is stocks', stocks)
    const realStocksList = []
    const profitLists = []
    for (let i = 0; i < stocks.length; i++) {
      portfolioService.getOneRealTimeData(stocks[i].sid).then((response) => {
        if (response.data.code === 200) {
          realStocksList.push(response.data.data)
          if (realStocksList.length === stocks.length) {
            for (let j = 0; j < realStocksList.length; j++) {
              for (let m = 0; m < allStocks.length; m++) {
                if (realStocksList[j].sid === allStocks[m].sid) {
                  realStocksList[j].enname = allStocks[m].enname
                  realStocksList[j].tsCode = allStocks[m].tsCode
                  break
                }
              }
            }
            setRealTimeStocks(realStocksList)
          }
        }
      })

      portfolioService.getOneProfit(pid, stocks[i].sid).then((response) => {
        if (response.data.code === 200) {
          profitLists.push(response.data.data)
          if (profitLists.length === stocks.length) {
            for (let j = 0; j < profitLists.length; j++) {
              for (let m = 0; m < allStocks.length; m++) {
                if (profitLists[j].sid === allStocks[m].sid) {
                  profitLists[j].enname = allStocks[m].enname
                  profitLists[j].tsCode = allStocks[m].tsCode
                  break
                }
              }
            }
            setProfitStocks(profitLists)
          }
        }
      })
    }
  }, [stocks])

  React.useEffect(() => {
    console.log(profitStocks)
  }, [profitStocks])

  const handleOpenBuy = () => {
    setOpenBuy(true)
  }

  const handleCloseBuy = () => {
    setOpenBuy(false)
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  function handleSearchStock(e) {
    setSearchStock(e.target.value)
  }

  function handleInputPrice(e) {
    setBuyPrice(e.target.value)
  }

  function handleInputLot(e) {
    setBuyLot(e.target.value)
  }

  function handleBuyDate(e) {
    setBuyDate(e.target.value)
  }

  const submitBuyStock = () => {
    function findStockId(stock) {
      let stockId = null
      for (let i = 0; i < allStocks.length; i++) {
        if (stock === allStocks[i].tsCode || stock === allStocks[i].enname) {
          stockId = allStocks[i].sid
          break
        }
      }
      return stockId
    }
    if (
      searchStock.length === 0 ||
      buyPrice.length === 0 ||
      buyLot.length === 0 ||
      buyDate.length === 0
    ) {
      showAlertMsg('error', 'Please finish all information')
      return
    }
    const stockId = findStockId(searchStock)
    if (!stockId) {
      showAlertMsg(
        'error',
        'We can match the right stock, please input right symbol or name'
      )
      return
    }
    for (let i = 0; i < stocks.length; i++) {
      if (stockId === stocks[i].sid) {
        showAlertMsg('error', 'Sorry, you can not buy a same stock again')
        return
      }
    }
    const data = {
      pid: pid,
      sid: stockId,
      lot: buyLot,
      price: buyPrice,
      tradeDate: buyDate,
    }
    portfolioService.buyOneStock(data).then((response) => {
      if (response.data.code === 200) {
        setFetchData((preState) => !preState)
        showAlertMsg('success', 'Buy a stock successfully')
        handleCloseBuy()
      }
    })
  }

  const submitSellStock = (e) => {
    console.log(e.currentTarget)
    const stockId = e.currentTarget.name
    const data = { pid: pid, sid: stockId }
    portfolioService.sellOneStock(data).then((response) => {
      if (response.data.code === 200) {
        setFetchData((preState) => !preState)
      }
    })
  }

  function DisPlayStocks(stocksList) {
    return (
      <Grid container className={classes.stockHolder} spacing={2}>
        {stocksList.map((ele, index) => {
          return (
            <Grid container spacing={2} className={classes.singleStock} key={ele.enname}>
              <Grid item xs={6}>
                <Typography>{`${ele.enname}`}</Typography>
              </Grid>
              <Grid item xs={6} align='center'>
                <Button
                  color='secondary'
                  onClick={submitSellStock}
                  name={ele.sid}
                >
                  SELL
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`${ele.tsCode}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`Bought: $${ele.price}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`Lot: ${ele.lot}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`Trade Date: ${changeTimeFormate(
                  ele.tradeDate
                )}`}</Typography>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  function DisPlayRealTimeStocks(stocksList) {
    for (let i = 0; i < stocksList.length; i++) {
      stocksList[i].rate = (
        ((stocksList[i].newPrice - stocksList[i].oldPrice) /
          stocksList[i].oldPrice) *
        100
      ).toFixed(2)
    }
    return (
      <Grid className={classes.stockHolder} spacing={2} container>
        {stocksList.map((ele, index) => {
          return (
            <Grid container spacing={2} className={classes.singleStock}>
              <Grid item xs={12}>
                <Typography>{`${ele.enname}`}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{`${ele.tsCode}`}</Typography>
              </Grid>
              {/* <Grid item xs={4}>
                <Typography>{`oldPrice: $${ele.oldPrice}`}</Typography>
              </Grid> */}
              <Grid item xs={4}>
                <Typography>{`Price: $${ele.newPrice}`}</Typography>
              </Grid>
              <Grid item xs={4}>
                {ele.rate >= 0 && (
                  <Typography
                    className={classes.positiveRate}
                  >{`${ele.rate}%`}</Typography>
                )}
                {ele.rate < 0 && (
                  <Typography
                    className={classes.negativeRate}
                  >{`${ele.rate}%`}</Typography>
                )}
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  function DisPlayProfitStocks(stockList) {
    console.log('come to display profit')
    for (let i = 0; i < stockList.length; i++) {
      stockList[i].profit = (
        (stockList[i].newPrice - stockList[i].oldPrice) *
        stockList[i].lot
      ).toFixed(2)
    }

    return (
      <Grid className={classes.stockHolder} spacing={2} container> 
        {stockList.map((ele, index) => {
          return (
            <Grid container spacing={2} className={classes.singleStock} key={ele.enname}>
              <Grid item xs={12}>
                <Typography>{`${ele.enname}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`${ele.tsCode}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`Bought: $${ele.oldPrice}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{`Now: $${ele.newPrice}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                {ele.profit >= 0 && (
                  <Typography
                    className={classes.positiveRate}
                  >{`Profit: $ ${ele.profit}`}</Typography>
                )}
                {ele.profit < 0 && (
                  <Typography
                    className={classes.negativeRate}
                  >{`Profit: $ ${ele.profit}`}</Typography>
                )}
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography className={classes.headText}>Gain:</Typography>
            <Typography
             style={{    fontFamily: 'Bungee',
             fontSize: '3rem', marginLeft:'2rem'}}
            >{`$${portGain}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              size='large'
              variant='outlined'
              color='primary'
              className={classes.buyNewButton}
              onClick={handleOpenBuy}
            >
              Buy New Stock
            </Button>
            <Button
              size='large'
              variant='outlined'
              color='primary'
              onClick={() => {
                setFetchData((preState) => !preState)
              }}
            >
              fresh Data
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.showPart}>
            <div className={classes.root}>
              <AppBar position='static'>
                <Tabs
                  value={tabValue}
                  onChange={handleChangeTab}
                  aria-label='simple tabs example'
                >
                  <Tab label='Check all stocks' {...a11yProps(0)} />
                  <Tab label='Real time price' {...a11yProps(1)} />
                  <Tab label='Profits' {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              {/* show all stocks you have bought */}
              {tabValue === 0 && (
                <Grid container className={classes.tabPanel}>
                  <Typography variant='h5' className={classes.subTitle}>
                    Show all stocks you have bought
                  </Typography>
                  {stocks.length === 0 && (
                    <Grid item xs={12}>
                      <Typography variant='h5' className={classes.subTitle}>
                        No stock, buy one!
                      </Typography>
                    </Grid>
                  )}
                  {stocks.length !== 0 && DisPlayStocks(stocks)}
                </Grid>
              )}
              {tabValue === 1 && (
                // show all stocks you have bought, real time data
                <Grid container className={classes.tabPanel}>
                  <Grid item xs={12}>
                    <Typography variant='h5' className={classes.subTitle}>
                      Show the real time data
                    </Typography>
                  </Grid>

                  {realTimeStocks.length === 0 && (
                    <Grid item xs={12}>
                      <Typography variant='h5' className={classes.subTitle}>
                        No stock, buy one!
                      </Typography>
                    </Grid>
                  )}
                  {realTimeStocks.length !== 0 &&
                    DisPlayRealTimeStocks(realTimeStocks)}
                </Grid>
              )}
              {tabValue === 2 && (
                // show all stocks you have bought, profits
                <Grid container className={classes.tabPanel}>
                  <Grid item xs={12}>
                    <Typography variant='h5' className={classes.subTitle}>
                      Show your profits
                    </Typography>
                  </Grid>
                  {profitStocks.length === 0 && (
                    <Grid item xs={12}>
                      <Typography variant='h5' className={classes.subTitle}>
                        No stock, buy one!
                      </Typography>
                    </Grid>
                  )}
                  {profitStocks.length !== 0 &&
                    DisPlayProfitStocks(profitStocks)}
                </Grid>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={openBuy}
        onClose={handleCloseBuy}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} align='center'>
              <Typography variant='h5'>Buy new stock</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Stock'
                required
                placeholder='Input name or symbol'
                onChange={handleSearchStock}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Price'
                required
                type='number'
                placeholder='Input price'
                onChange={handleInputPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Lot'
                required
                type='number'
                placeholder='Input lot'
                onChange={handleInputLot}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='date'
                label='Trade date'
                type='date'
                onChange={handleBuyDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color='primary'
                variant='contained'
                onClick={submitBuyStock}
              >
                Buy
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </React.Fragment>
  )
}
