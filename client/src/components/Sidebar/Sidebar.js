import React, { Component } from "react";
import { Link } from 'react-router-dom';
import M from "materialize-css";
import "./Sidebar.css";
import LoginRegisterRedirect from './LoginRegisterRedirect';
import ProfileLogOutRedirect from './ProfileLogOutRedirect';


class Sidebar extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 450,
      outDuration: 450,
    });
  }
  render() {
    const {isAuthenticated, name, handleUserLogOut, email, image } = this.props;
    return (
      <div className = "navbar-fixed">
        <nav>
          <div className = "nav-wrapper blue darken-1"> 
          {/* https://materializecss.com/color.html */}
            <div className="col-s12">
              <ul id="slide-out" className="sidenav sidenav-close">
                {
                isAuthenticated === false ? <LoginRegisterRedirect /> : <ProfileLogOutRedirect handleUserLogOut={handleUserLogOut} name={name} email={email} image={image}/> 
                }
              </ul>
              <a href="#open" data-target="slide-out" className="sidenav-trigger left show-on-medium-and-up">
                <i className="material-icons">menu</i>
              </a>
            </div>
            <Link to={'/'} className="brand-logo center">
              <img src={ require('../../public/logo.png')} width = "50px" height="50px" alt=""/>
                Split It
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Sidebar;