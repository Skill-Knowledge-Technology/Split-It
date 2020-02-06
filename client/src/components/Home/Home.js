import React from 'react';
import './Home.css'

function Home(props) {
  return (
    <div className= "container">
      <div className="row">
        <div className="col s12 m6 l6">
          <div className="card">
            <div className="card-image">
              <img src={ require('../../public/Home/Calc.jpg')}  alt = "Calc" className = "img-size"/>
            </div>
            {/* <div class="card-title">Manual Input</div>
            <div class="card-content">
              <p>TEXT.</p>
            </div> */}
            <a className="waves-effect waves-light btn-large" href="UserInput"> Manual Input <i className="material-icons right">computer</i> </a>
          </div>
        </div>
        <div className="col s12 m6 l6">
          <div className="card med">
            <div className="card-image">
              <img src={ require('../../public/Home/Camera.png')}  alt = "Camera" className = "img-size"/>
            </div>
            {/* <div class="card-title">Camera</div>
            <div class="card-content">
              <p>TEXT.</p>
            </div> */}
            <a className="waves-effect waves-light btn-large" href="Camera"> Camera <i className="material-icons right">photo_camera</i> </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;