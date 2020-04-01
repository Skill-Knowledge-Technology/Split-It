import React from 'react';
import './Login.css';
import API from "../../utils/api";
import {	withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:"",
      error: "",
      isAuthenticated: false,
      loading: false,
    };
  }

  
  // save user
  handleUserLogin = () => {
    console.log("handleUserLogin function invoked");
    API.loginUser({
      email: this.state.email,
      password: this.state.password,
    }).then((res)=> {
      const { token } = res.data
      localStorage.setItem("jwtToken",token)
      API.setAuthToken(token)
      const decoded = jwt_decode(token)
      console.log(decoded)
    })
    .catch((error) => {
      this.setState({error})
      console.log(this.setState)
    })
  }

  // Handle field change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };


  // eventually api call to call the backend 
  handleSubmit = e => {
    e.preventDefault();
    const {email, password} = this.state;
    console.log(this.state);
    this.handleUserLogin();
  }


  render() {
    return (
      <div className = "loginbox">
        <h4><u>Login</u></h4>
        <form className = "col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" placeholder="Enter Email" onChange={this.handleChange('name')} className="validate"/>
              <label>Email</label>
              <span className="helper-text" data-error="Invalid Email" data-success="Valid" onChange={this.handleChange('error')} >Please Enter a Valid Email</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" placeholder="Enter Password" onChange={this.handleChange('password')} className="validate"/>
              <label>Password</label>
            </div>
          </div>
        </form>
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit} >Login<i className="material-icons right">send</i></button>
      </div>
    );
  }
}