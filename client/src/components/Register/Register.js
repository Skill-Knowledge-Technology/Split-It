import React, { Component } from "react";
import "./Register.css";
import API from "../../utils/api";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: [],
    };
  }

  // save user
  handleUserSave = () => {
    console.log("handleUserSave function invoked");
    API.saveUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    })
      .then(() => {
        console.log("user data sent to register route");
        return this.props.history.push("/login");
      })
      .catch((error) => {
        if (error.response) {
           console.log(error.response.data);
           let errorObject = error.response.data
          //  console.log(typeof(errors)) // object
          let errorArray = []
           errorObject.errors.forEach( data => {
             errorArray.push(data.msg)         
            });
          
          // we want to filter duplicate errors in the array in case the user spams 
          let removeDuplicate = new Set(errorArray)
          this.setState({
            errors: Array.from(removeDuplicate)
          })
        }
      });
  };

  // Handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // eventually api call to call the backend
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (username === "") {
      alert("Please Enter a Name (Can Be Anything)");
    } else if (email === "") {
      alert("Please Enter a Correct Email");
    } else if (password === "" || password.length < 6) {
      alert("Please Enter a Password With a Length of At Least 6");
    } else if (password !== password2) {
      alert("Your Password and Confirmation Password Do Not Match.");
    } else {
      // Insert Backend Here.
      this.handleUserSave();
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Register</span>
                <form>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <label for="username" className="active">Username</label>
                    <input placeholder="Enter Username" id="username" type="text"
                      onChange={this.handleChange("username")}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <label for="email" className="active">E-mail</label>
                    <input id="email" type="email" placeholder="Enter Email" className="validate"
                      onChange={this.handleChange("email")}/>
                    <span className="helper-text" data-error="Invalid Email" data-success="Valid">
                      Please Enter a Valid Email
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <label for="password" className="active">Password</label>
                    <input id="password" type="password" placeholder="Enter Password"
                      onChange={this.handleChange("password")}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <label for="password2" className="active">Confirm Password</label>
                    <input id="password2" type="password" placeholder="Reenter Password"
                      onChange={this.handleChange("password2")}/>
                  </div>
                </div>
              </form>
              <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>
                Sign Up
                <i className="material-icons right">send</i>
              </button>
              { this.state.errors.length > 0 ? this.state.errors.map((error,index) => {
                return <li key={index}> {error} </li>
              })
              :
              <div></div>
              } 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
