import React from 'react';

export default class Step1 extends React.Component {
  EZ = e => {
    e.preventDefault();
    this.props.nextStep();
  };


  Detailed = e => {
    e.preventDefault();
    this.props.nextJump();
  };

  render(){ 
    return(
      <div className="row">
        <div className="col s12 m6 l6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">EZ Split</span>
              <p>An Easy Computation</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light float-right"
                type="button" name="action" onClick={this.EZ}>
                Click Here
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div className="col s12 m6 l6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Detailed Split</span>
              <p>A More Detailed and Accurate Computation</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light float-right"
                type="button" name="action" onClick={this.Detailed}>
                Click Here
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}