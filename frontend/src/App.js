import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import MyPortfolios from "./Pages/MyPortfolios";
import Stock from "./Pages/Stock";
import Market from "./Pages/Market"
import { Switch, Route } from "react-router-dom";
// import AuthSerive from "./services/auth-serive";
import React from "react";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home  />
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
        <Route path="/stock/:id" exact>
          <Stock />
        </Route>
        <Route path="/market" exact>
          <Market />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
