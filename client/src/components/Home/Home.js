import React from 'react';

function Home(props) {
  return (
    <h1 className= "center">
      Home Page
        <div className="divider" />
        <a className="waves-effect waves-light btn" href="Camera">Button (CAMERA PAGE)</a>
        <div className="divider" />
        <a className="waves-effect waves-light btn" href="UserInput">Button (MANUAL PAGE) <i className="material-icons right">cloud</i></a>
        <div className="divider" />
        <a className="waves-effect waves-light btn-large" href="Camera">Large Button (CAMERA PAGE)</a>
        <div className="divider" />
    </h1>
  );
}


export default Home;