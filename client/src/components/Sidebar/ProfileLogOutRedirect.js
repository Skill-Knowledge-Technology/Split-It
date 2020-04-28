import React from 'react';
import { Link } from 'react-router-dom';

// this will show the profile and logout option if user is authenticated
const ProfileLogOutRedirect = ({ userID, name, handleUserLogOut }) => {
  return (
    <div>
      <li>  
        <Link to={`/Profile`} className="waves-effect"> My Profile: {name} </Link>
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
    </div>
  )
}

export default ProfileLogOutRedirect;