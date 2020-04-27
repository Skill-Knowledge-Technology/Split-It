import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterRedirect = () => {
  return (
    <div>
      <li>
        <Link to="/Login" className="waves-effect">Login</Link>
      </li>
      <li>
        <Link to="/Register" className="waves-effect">Register</Link>
      </li>
    </div>
  )
}

export default LoginRegisterRedirect;
