import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {Button} from 'reusables/Button/Button'
import "./FirstPage.css"

const RegisterForm = props => {  
  const [isRegistered, register] = React.useState(false);
  const submitRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", {
        firstname: props.firstname,
        lastname: props.lastname,
        password: props.password,
        email: props.email.toLowerCase()
      })
      .then(response => {
        if (response.data.isValid) {
          props.getCredentials({ target: { name: "password", value: "" } });  
          alert(response.data.message);
          register(true);
        }
      })
      .catch(err => {
        const errorMessage = err.response ? err.response.data.message : 'Server is down, please try again later!';
        alert(errorMessage)
      });
  };

  if (isRegistered) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container register-form-container">
      <h3>Please complete all fields</h3>
      <Link to="/">
        <Button extraClass={`close-register close-button`} text={'X'} />
      </Link>
      <form id="register" className="register-form" method="post" onSubmit={submitRegister}>
        <label htmlFor="registerFirstname">
          <b>Firstname</b>
        </label>
        <input
          id="registerFirstname"
          className="register-input"
          name="firstname"
          type="text"
          placeholder="Firstname"
          autoComplete="off"
          onChange={props.getCredentials}
          required
        />
        <label htmlFor="registerName">
          <b>Name</b>
        </label>
        <input
          id="registerName"
          className="register-input"
          name="lastname"
          type="text"
          placeholder="Name"
          autoComplete="off"
          onChange={props.getCredentials}
          required
        />
        <label htmlFor="registerPassword">
          <b>Password</b>
        </label>
        <input
          id="registerPassword"
          className="register-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={props.getCredentials}
          required
        />
        <label htmlFor="registerEmail">
          <b>Email</b>
        </label>
        <input
          id="registerEmail"
          className="register-input"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={props.getCredentials}
          required
        />
         <Button type={'submit'} extraClass={'register-button submit-button'} text={'Register'} />
      </form>
    </div>
  );
};

export default RegisterForm;
