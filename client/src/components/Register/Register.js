import React, { Component } from 'react';
import './Register.css';
import API from "../../utils/api";
import {	withRouter } from 'react-router-dom';



export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  // save user
  handleUserSave = id => {
    console.log("handleUserSave function invoked");
    API.saveUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }).then(console.log("user data sent to register route"))
    .catch((error)=> {
      console.log(error)
    })
  }

  // Handle field change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // eventually api call to call the backend 
  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (username === '') {
      alert("Please Enter a Name (Can Be Anything)");
    }
    else if (email === '') {
      alert("Please Enter a Correct Email");
    }
    else if (password === '' || password.length < 6) {
      alert("Please Enter a Password With a Length of At Least 6");
    }
    else if (password !== password2) {
      alert("Your Password and Confirmation Password Do Not Match.");
    }
    else {
      // Insert Backend Here.
      console.log(this.state);

      this.handleUserSave();
    }
  }

  render() {
    return (
      <div className="registerbox">
        <h4><u>Register</u></h4>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input placeholder="Enter Username" id="username" type="text" onChange={this.handleChange('username')} />
              <label>Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" placeholder="Enter Email" className="validate" onChange={this.handleChange('email')} />
              <label>Email</label>
              <span className="helper-text" data-error="Invalid Email" data-success="Valid">Please Enter a Valid Email</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" placeholder="Enter Password" onChange={this.handleChange('password')} />
              <label>Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input id="password2" type="password" placeholder="Reenter Password" onChange={this.handleChange('password2')} />
              <label>Confirm Password</label>
            </div>
          </div>
        </form>
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>Sign Up<i className="material-icons right">send</i></button>
      </div>
    );
  }
}