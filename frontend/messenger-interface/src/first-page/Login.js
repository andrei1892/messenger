import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {Button} from "reusables/Button/Button";
import "./Login.css"

const LoginForm = props => {
  const [isLogged, logging] = React.useState(false);
  const logIn = ev => {
    ev.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        username: props.username, //.toLowerCase(), - if username is empty props is undefined
        password: props.password
      })
      .then(response => {
        if (response.data.isValid) {
          alert(response.data.message);
          localStorage.setItem("token", response.data.token);
          props.getCredentials({ target: { name: "password", value: "" } });
          logging(true);
        } else alert(response.data.message);
      })
      .catch(err => { 
        const errorMessage = err.response ? err.response.data.message : 'Server is down, please try again later!';
        alert(errorMessage )
      });
    ev.target.reset(); 
  };

  if (isLogged) return <Redirect to="/profile" />;
  return (
    <div className="form-container login-form-container">
      <h2> Be together, whenever. </h2>
      <form id="login" className="form" onSubmit={logIn}>
        <label htmlFor="loginEmail">
          <b>Sign in below</b>
        </label>
        <input
          id="loginEmail"
          className="login-input form-control"
          type="email"
          name="username"
          autoComplete="off"
          placeholder="Email"
          onChange={props.getCredentials}
        />
        <input
          className="login-input form-control"
          name="password"
          type="password"
          autoComplete="off"
          placeholder="Password"
          onChange={props.getCredentials}
        />
        <Button type={'submit'} classes={"submit-button"} content={'Sign In'} />
      </form>
      <p>
        Don't have an account? <Link to="/register"> Register </Link> now!
      </p>
    </div>
  );
};

export default LoginForm;
