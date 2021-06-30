import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import LogIn from "./auth/LogIn";
import Home from "./home/Home";
import User from "./user/User";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = () => {
    setLoggedIn(true);
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn: loggedIn, login: loginHandler }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <LogIn />
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
