import React from 'react';

function HomePage(props) {
  return (
    <h1 className= "center">
      Home Page
        <div className="divider" />
        <a className="waves-effect waves-light btn" href="CameraPage">Button (CAMERA PAGE)</a>
        <div className="divider" />
        <a className="waves-effect waves-light btn" href="ManualPage">Button (MANUAL PAGE) <i className="material-icons right">cloud</i></a>
        <div className="divider" />
        <a className="waves-effect waves-light btn-large" href="CameraPage">Large Button (CAMERA PAGE)</a>
        <div className="divider" />
    </h1>
  );
}


export default HomePage;