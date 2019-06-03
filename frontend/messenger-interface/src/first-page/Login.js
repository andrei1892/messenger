import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

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
        console.log(response);
        if (response.data.isValid) {
          logging(true);
          props.getCredentials({ target: { name: "password", value: "" } });
          alert(response.data.message);
        } else alert(response.data.message);
      })
      .catch(err => console.log(err));
  };

  if (isLogged) return <Redirect to="/user/profile" />;
  return (
    <div className="login-form-container">
      <h2> Be together, whenever. </h2>
      <form id="login" className="login-form" onSubmit={logIn}>
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
        <button className="login-submit-button " type="submit">
          Submit
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register"> Register </Link> now!
      </p>
    </div>
  );
};

export default LoginForm;
