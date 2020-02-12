import React from 'react';
import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email: "",
      password:"",
      error: ""
    };
  }

  render() {
    return (
      <div className = "loginbox">
        <h4><u>Login</u></h4>
        <form className = "col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" placeholder="Enter Email" className="validate"/>
              <label for="email">Email</label>
              <span className="helper-text" data-error="Invalid Email" data-success="Valid">Please Enter a Valid Email</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" placeholder="Enter Password" className="validate"/>
              <label for="password">Password</label>
            </div>
          </div>
        </form>
        <button class="btn waves-effect waves-light" type="submit" name="action">Login<i class="material-icons right">send</i></button>
      </div>
    );
  }
}