import React from 'react';
import { Link } from 'react-router-dom';

// this will show the profile and logout option if user is authenticated
const ProfileLogOutRedirect = ({ userID, name, handleUserLogOut }) => {
    return (
        <div>
            <li>  
                <Link to={`/Profile/${userID}`} className="waves-effect"> {name} </Link>

            </li>
            <li>
                <Link to="/" onClick={handleUserLogOut} className="waves-effect">Logout</Link>
            </li>
        </div>
    )
}

export default ProfileLogOutRedirect;

