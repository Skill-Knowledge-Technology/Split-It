import React , { Component }from 'react';
import './Register.css';

export default class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        email: "",
        password:"",
        password2: "",
        error: ""
      };
    }

    // Handle field change
    handleChange = e => {
      this.setState({[e.target.id]: e.target.value})
    }
    // eventually api call to call the backend 
    handleSubmit = e => {
      e.preventDefault()
      const { name, email, password, password2} = this.state
      this.setState({ name, email, password, password2})
      console.log(this.state)
    }
  
    render() {
      return (
        <div className="registerbox">
          <h4><u>Register</u></h4>
          <form className = "col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input placeholder="Enter Name" id="first_name" type="text" className="validate" onChange={this.handleChange}/>
                <label for="first_name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" type="email" placeholder="Enter Email" className="validate" onChange={this.handleChange}/>
                <label for="email">Email</label>
                <span className="helper-text" data-error="Invalid Email" data-success="Valid">Please Enter a Valid Email</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input id="password" type="password" placeholder="Enter Password" className="validate" onChange={this.handleChange}/>
                <label for="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input id="password" type="password" placeholder="Reenter Password" className="validate" onChange={this.handleChange}/>
                <label for="password">Confirm Password</label>
              </div>
            </div>
          </form>
          <button class="btn waves-effect waves-light" type="submit" name="action">Sign Up<i class="material-icons right">send</i></button>
        </div>
      );
    }
}