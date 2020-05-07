import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home(props) {
  return (
    <div className= "container">
      <div className="row">
        <div className="col s12 m6 l6">
          <div className="card">
            <div className="card-image">
              <img src={ require('../../public/Home/NewCalculator.png')}  alt = "Calc" className = "resizeimg"/>
            </div>
            {/* <div className="card-title">Manual Input</div>
            <div className="card-content">
              <p>TEXT.</p>
            </div> */}
            <Link to={`/UserInput`} className="waves-effect waves-light btn-large">
              <i className="material-icons left">computer</i>
              User Input
              <i className="material-icons right">computer</i>
            </Link>
          </div>
        </div>
        <div className="col s12 m6 l6">
          <div className="card med">
            <div className="card-image">
              <img src={ require('../../public/Home/NewCamera.png')}  alt = "Camera" className = "resizeimg"/>
            </div>
            {/* <div className="card-title">Camera</div>
            <div className="card-content">
              <p>TEXT.</p>
            </div> */}
            <Link to={`/Camera`} className="waves-effect waves-light btn-large">
              <i className="material-icons left">camera_alt</i>
              Camera
              <i className="material-icons right">camera_alt</i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;