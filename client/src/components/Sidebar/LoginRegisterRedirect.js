import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterRedirect = () => {
  return (
    <div>
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
        <Link to={`/Login`} className="waves-effect">
          <i className="material-icons">exit_to_app</i>
          Login
        </Link>
      </li>
      <li>
        <Link to={`/Register`} className="waves-effect">
          <i className="material-icons">portrait</i>
          Register
        </Link>
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

export default LoginRegisterRedirect;
