import Home from './Pages/Home'
import Register from './Pages/Register'
import Signin from './Pages/Signin'
import MyPortfolios from './Pages/MyPortfolios'
import Stock from './Pages/Stock'
import Market from './Pages/Market'
import SinglePortfolio from './Pages/SinglePortfolio'
import { Switch, Route } from 'react-router-dom'
import AuthService from './services/auth-service'
import stockService from './services/stock-service'
import AlertMsg from './Components/AlertMsg'
import React from 'react'

function App() {
  let [currentUser, setCurrentUser] = React.useState(
    AuthService.getCurrentUser()
  )
  const [allStocks, setAllStocks] = React.useState([])
  const [showAlert, setShowAlert] = React.useState({
    alertType: 'none',
    alertContent: '',
  })
  React.useEffect(() => {
    stockService.getAllStock().then((response) => {
      if (response.data.code === 200) {
        setAllStocks(response.data.data)
      }
    })
  }, [])
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path='/register' exact>
          <Register setShowAlert={setShowAlert} />
        </Route>
        <Route path='/signin' exact>
          <Signin setShowAlert={setShowAlert} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path='/portfolios' exact>
          <MyPortfolios
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowAlert={setShowAlert}
          />
        </Route>
        <Route path='/portfolio/:id' exact>
          <SinglePortfolio
            currentUser={currentUser}
            setShowAlert={setShowAlert}
            allStocks={allStocks}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path='/stock/:id' exact>
          <Stock currentUser={currentUser} setCurrentUser={setCurrentUser} allStocks={allStocks}/>
        </Route>
        <Route path='/market' exact>
          <Market currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
      <AlertMsg {...showAlert} />
    </div>
  )
}

export default App
