import React from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
    const [isRegistered, register] = React.useState(false);
    
    const submitRegister = (props) => {
            axios.post('http://localhost:4000/register',{
            firstname: props.firstname,
            lastname: props.lastname,
            password: props.password,
            email: props.email
        })
        .then( response => {
            if(response.isValid) {
                alert('Registrations Succesfull');
                register(true);
            }
        }) 
        .catch( err => console.log(err) )
    }
    
    if(isRegistered) { return <Redirect to="/" /> }
    return (
        <div className= "register-form-container" >
        <h3>Please complete all fields</h3>
        <Link to="/">
        <button className="close-register-form" >
          X
        </button>
        </Link>
      <form
        id="register"
        className= "register-form"
        onSubmit={submitRegister}
      >
        <label htmlFor="registerFirstname"><b>Firstname</b></label>
        <input
          id="registerFirstname"
          className="register-input"
          name="firstname"
          type="text"
          placeholder="Firstname"
          onChange={props.getCredentials}
          required
        />
        <label htmlFor="registerName"><b>Name</b></label>
        <input
          id="registerName"
          className="register-input"
          name="lastname"
          type="text"
          placeholder="Name"
          onChange={props.getCredentials}
          required
        />
        <label htmlFor="registerPassword"><b>Password</b></label>
        <input
              id="registerPassword"
              className="register-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={props.getCredentials}
              required
        />
        <label htmlFor="registerEmail"><b>Email</b></label>
        <input
          id="registerEmail"
          className="register-input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={props.getCredentials}
          required
        />
        <button
          type="submit"
          className="register-submit-button btn btn-success"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
