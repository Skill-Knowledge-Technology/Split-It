import React from 'react';

function Home(props) {
  return (
    <h1 className= "center">
      Home Page
        <div className="divider" />
        <a className="waves-effect waves-light btn-large" href="UserInput"> Manual Input <i className="material-icons right">computer</i> </a>
        <div className="divider" />
        <a className="waves-effect waves-light btn-large" href="Camera"> Camera <i className="material-icons right">photo_camera</i> </a>
        <div className="divider" />
    </h1>
  );
}


export default Home;