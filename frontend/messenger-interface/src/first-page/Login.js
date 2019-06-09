import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import SubmitButton from "../reusables/SubmitButton";

const LoginForm = props => {
  const [isLogged, logging] = React.useState(false);
  const logIn = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        username: props.username,
        password: props.password
      })
      .then(response => {
        if (response.data.isValid) {
          alert(response.data.message);
          logging(true);
          localStorage.setItem("token", response.data.token);
          props.getCredentials({ target: { name: "password", value: "" } });
        } else alert(response.data.message);
      })
      .catch(err => console.log(err));
  };

  if (isLogged) return <Redirect to="/profile" />;
  return (
    <div className="form-container login-form-container">
      <h2> Be together, whenever. </h2>
      <form id="login" className="form" onSubmit={logIn}>
        <label htmlFor="loginEmail">
          <b>Log In below</b>
        </label>
        <input
          id="loginEmail"
          className="login-input form-control"
          type="email"
          name="username"
          placeholder="Email"
          onChange={props.getCredentials}
        />
        <input
          className="login-input form-control"
          name="password"
          type="password"
          placeholder="Password"
          onChange={props.getCredentials}
        />
        <SubmitButton class="submit-button" />
      </form>
      <p>
        Don't have an account? <Link to="/register"> Register </Link> now!
      </p>
    </div>
  );
};

export default LoginForm;
