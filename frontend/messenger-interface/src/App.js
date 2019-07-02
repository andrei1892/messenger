import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginForm from "./first-page/Login";
import RegisterForm from "./first-page/Register";
import Profile from "./profile/Profile";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  getCredentials = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="page-wrapper">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={props => <LoginForm {...props} getCredentials={this.getCredentials} {...this.state}/>} />
            <Route
              path="/register"
              render={props => <RegisterForm {...props} getCredentials={this.getCredentials} {...this.state}/>}
            />
            <Route path="/profile" render={() => <Profile />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
