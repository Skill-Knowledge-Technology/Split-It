import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import LoginRegisterRedirect from './LoginRegisterRedirect';
import ProfileLogOutRedirect from './ProfileLogOutRedirect';


class Sidebar extends Component {
  componentDidMount() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem, {
        edge: "left",
        inDuration: 450
    });
  }
  render() {
    const {isAuthenticated, name, handleUserLogOut } = this.props
    return (
      <div className = "navbar-fixed">
      <nav>
      <div className = "nav-wrapper blue darken-1"> 
      {/* https://materializecss.com/color.html */}
        <div className="col-s12">
          <ul id="slide-out" className="sidenav">
            
            <li>
              <a href="/">
                <i className="material-icons">home</i>
                Home
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
            {
             isAuthenticated === false ? <LoginRegisterRedirect /> : <ProfileLogOutRedirect handleUserLogOut={handleUserLogOut} name={name} /> 
            }
            {/* <li>
              <a className="waves-effect" href="Login">
                Login
              </a>
            </li>
            <li>
              <a className="waves-effect" href="Register">
                Register
              </a>
            </li> */}
            <li>
              <div className="divider" />
            </li>
            <li>
              <a className="waves-effect" href="AboutUs">
                About Us
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
            {/* <li>
              <a className="subheader">Subheader</a>
            </li> */}
          </ul>
          <a href="#" data-target="slide-out" className="sidenav-trigger left show-on-medium-and-up">
          <i className="material-icons">menu</i>
          </a>
        </div>
        <a href="/" className="brand-logo center">
        {<img src={ require('../../public/logo.png')} width = "50px" height="50px" />}
          Split It
        </a>
      </div>
      </nav>
      </div>
    );
  }
}

export default Sidebar;