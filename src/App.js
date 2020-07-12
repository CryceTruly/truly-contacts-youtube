import React, { useState, Suspense } from "react";
import logo from "./assets/images/logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import routes from "./routes";
import "semantic-ui-css/semantic.min.css";
import { GlobalProvider } from "./context/Provider";
import isAuthenticated from "./utils/isAuthenticated";
import UserLeaveConfirmation from "./components/UserLeaveConfirmation";

const RenderRoute = (route) => {
  const history = useHistory();

  document.title = route.title || "TrulyContacts";
  if (route.needsAuth && !isAuthenticated()) {
    history.push("/auth/login");
  }
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  );
};

function App() {
  const [confirmOpen, setConfirmOpen] = useState(true);
  return (
    <GlobalProvider>
      <Router
        getUserConfirmation={(message, callback) => {
          return UserLeaveConfirmation(
            message,
            callback,
            confirmOpen,
            setConfirmOpen
          );
        }}
      >
        <Suspense fallback={<p>Loading</p>}>
          <Switch>
            {routes.map((route, index) => (
              <RenderRoute {...route} key={index} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </GlobalProvider>
  );
}

export default App;
