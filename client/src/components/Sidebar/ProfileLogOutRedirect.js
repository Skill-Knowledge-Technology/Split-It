import React from 'react';
import { Link } from 'react-router-dom';

// this will show the profile and logout option if user is authenticated
const ProfileLogOutRedirect = ({ name, handleUserLogOut, email, image }) => {
  return (
    <div>
      <li>
        <div className="user-view">
          <div className="background">
            <img src={require("../../public/space.jpg")} alt=""/>
          </div>
          <div>
            <Link to={`/Profile`} className="waves-effect">
              <img className="circle" src={image} alt=""/>
            </Link>
          </div>
          <div>
            <Link to={`/Profile`} className="waves-effect">
              <span className="white-text name">{name}</span>
            </Link>
          </div>
          <div>
            <Link to={`/Profile`} className="waves-effect"> 
              <span className="white-text email">{email}</span>
            </Link>
          </div>
        </div>
      </li>
      <li>
        <Link to={`/`} className="waves-effect">
          <i className="material-icons">home</i>
          Home
        </Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li>  
        <Link to={`/Payments`} className="waves-effect"> Payments </Link>
      </li>
      <li>  
        <Link to={`/Friends`} className="waves-effect"> Friends</Link>
      </li>
      <li>
        <Link to="/" onClick={handleUserLogOut} className="waves-effect">Logout</Link>
      </li>
      <li>
        <Link to={`/UserInput`} className="waves-effect">Logged In User Input</Link>
      </li>
      <li>
        <Link to={`/Camera`} className="waves-effect">Logged In Camera</Link>
      </li>
      <li>
        <div className="divider" />
      </li>
      <li>
        <Link to={`/AboutUs`} className="waves-effect">
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