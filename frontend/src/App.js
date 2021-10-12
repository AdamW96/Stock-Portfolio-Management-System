import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import { Switch, Route } from "react-router-dom";
import AuthSerive from "./services/auth-serive";
import React, { useState } from "react";
function App() {
  let [currentUser, setCurrentUser] = useState(AuthSerive.getCurrentUser());
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>
        </Route>
        <Route path="/register" exact>
          <div className="App">
            <Register />
          </div>
        </Route>
        <Route path="/signin" exact>
          <div className="App">
            <Signin />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
