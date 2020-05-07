import React from 'react';
import { Link } from 'react-router-dom';

// this will show the profile and logout option if user is authenticated
const ProfileLogOutRedirect = ({ name, handleUserLogOut, email, image }) => {
  return (
    <div>
      <li>
        <div className="user-view">
          <div className="background">
            <img src={require("../../public/city.png")} alt=""/>
          </div>
          <div>
            <Link to={`/Profile`}>
              <img className="circle" src={image} alt=""/>
            </Link>
          </div>
          <div>
            <Link to={`/Profile`}>
              <span className="white-text name">{name}</span>
            </Link>
          </div>
          <div>
            <Link to={`/Profile`}> 
              <span className="white-text email">{email}</span>
            </Link>
          </div>
        </div>
      </li>
      <li>
        <Link to={`/`}>
          <i className="material-icons">home</i>
          Home
        </Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li>
        <Link to={`/UserInput`}>
          <i className="material-icons">computer</i>
          User Input
        </Link>
      </li>
      <li>
        <Link to={`/Camera`}>
          <i className="material-icons">camera_alt</i>
          Camera
        </Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li>  
        <Link to={`/Payments`}>
          <i className="material-icons">payment</i>
          Payments
        </Link>
      </li>
      <li>  
        <Link to={`/Friends`}>
          <i className="material-icons">contacts</i>
          Friends
        </Link>
      </li>
      <li>  
        <Link to={`/History`}>
          <i className="material-icons">history</i>
          History
        </Link>
      </li>
      <li>  
        <Link to={`/Maps`}>
          <i className="material-icons">map</i>
          Map History
        </Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li>
        <Link to="/" onClick={handleUserLogOut}>
          <i className="material-icons">power_settings_new</i>
          Logout
        </Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li>
        <Link to={`/AboutUs`}>
          <i className="material-icons">info</i>
          About Us
        </Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      {/* <li>
        <a className="subheader">Subheader</a>
      </li> */}
    </div>
  )
}

export default ProfileLogOutRedirect;