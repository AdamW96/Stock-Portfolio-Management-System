import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import MyPortfolios from "./Pages/MyPortfolios";
import Stock  from "./Pages/Stock";
import { Switch, Route } from "react-router-dom";
import AuthSerive from "./services/auth-serive";
import React, { useState } from "react";



function App() {
  let [currentUser, setCurrentUser] = useState(AuthSerive.getCurrentUser());
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Route path="/portfolios" exact>
          <MyPortfolios />
        </Route>
        <Route path="/stock" exact>
          <Stock />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
