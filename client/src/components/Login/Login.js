import React from "react";
import "./Login.css";
import API from "../../utils/api";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.handleRedirect();
    }
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: [...this.props.errors]
      })
    }
  }

  // Handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // eventually api call to call the backend
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleUserLogin(email, password);
  };

  handleRedirect = () => {
    if (this.props.isAuthenticated == true) {
      return this.props.history.push("/");
    } else {
      return this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Login</span>
                <form>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">email</i>
                      <label for="email" className="active">E-mail</label>
                      <input id="email" type="email" placeholder="Enter Email" className="validate"
                        onChange={this.handleChange("email")}/>
                      <span className="helper-text" data-error="Invalid Email" data-success="Valid" onChange={this.handleChange("error")}>
                        Please Enter a Valid Email
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">lock</i>
                      <label for="password" className="active">Password</label>
                      <input id="password" type="password" placeholder="Enter Password" 
                        onChange={this.handleChange("password")} className="validate"/>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-action">
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>
                  Login
                  <i className="material-icons right">send</i>
                </button>
                { this.state.errors.length > 0 ?  
                this.state.errors.map((error,index) => {
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

export default withRouter(Login);
