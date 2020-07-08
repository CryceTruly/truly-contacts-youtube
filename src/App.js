import React from "react";
import logo from "./assets/images/logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import "semantic-ui-css/semantic.min.css";
import { GlobalProvider } from "./context/Provider";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              render={(props) => <route.component {...props} />}
            ></Route>
          ))}
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
