import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import LogIn from "./auth/LogIn";
import Home from "./home/Home";
import User from "./user/User";
import SignUp from "./auth/SignUp";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = () => setLoggedIn(true);

  const logoutHandler = () => setLoggedIn(false);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn: loggedIn, login: loginHandler, logout: logoutHandler }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <LogIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            {loggedIn && (
              <Route path="/user">
                <User />
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
