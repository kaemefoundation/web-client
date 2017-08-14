import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import "offline-js";
import "offline-js/themes/offline-theme-default-indicator.css";
import "offline-js/themes/offline-language-english-indicator.css";
import Orphan from "./scenes/Orphan/index";
import OrphanageList from "./scenes/Orphanage/index";
import OrphanageForm from "./scenes/Orphanage/OrphanageForm";
import Users from "./scenes/Users/index";
import Reports from "./scenes/Reports/index";
import Login from "./scenes/Authentication/Login";
import LogoutButton from "./scenes/Authentication/LogoutButton";
import Auth from "./scenes/Authentication/Auth";

window.Offline.check();

let auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated()
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />}
  />
);
class App extends Component {
  
  render() {

    return (
      <Router>

        <div>

          {auth.isAuthenticated() &&
            <div id="header" className="ui huge borderless fixed fluid menu">
              <a className="item logo">Kaeme</a>
              <div className="item">
                <NavLink className="item" to="/orphan">Children</NavLink>
              </div>

                 <div className="item">
                  <NavLink className="item" to="/orphanage">
                    Residential Homes
                  </NavLink>
                  
              </div>
              

              <div className="right menu">
                <LogoutButton auth={auth} />
              </div>
            </div>}
          {!auth.isAuthenticated() &&
            <div id="header" className="ui huge borderless fixed fluid menu">
              <a className="item logo">Kaeme</a>
            </div>}

          <div style={{ marginTop: 80, padding: 20 }}>
            <Switch>
              <Route exact path="/login" render={() => <Login auth={auth} />} />
              <Route
                exact
                path="/callback"
                render={() => {
                  auth.handleAuthentication(() => {
                    window.location.href = "/";
                  });
                }}
              />
              <PrivateRoute exact path="/" component={Orphan} />

              <PrivateRoute path="/orphan/:id/:part" component={Orphan} />
              <PrivateRoute path="/orphan/:id" component={Orphan} />
              <PrivateRoute path="/orphan" component={Orphan} />
              <PrivateRoute path="/orphanage/:id" component={OrphanageForm} />
              <PrivateRoute path="/orphanage" component={OrphanageList} />

              <PrivateRoute path="/reports" component={Reports} />
              <PrivateRoute path="/users" component={Users} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
