import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterRedirect = () => {
  return (
    <div>
      <li>
        <a className="waves-effect" href="Login">
          Login
        </a>
      </li>
      <li>
        <a className="waves-effect" href="Register">
          Register
        </a>
      </li>
    </div>
  )
}

export default LoginRegisterRedirect;
