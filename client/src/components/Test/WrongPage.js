import React from 'react';

export default class Step1 extends React.Component {
  Wrong = e => {
    e.preventDefault();
    this.props.wrongStep();
  };

  render(){ 
    return(
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Wrong Page</span>
              <p>
                Error 404: Something Is Wrong. You're Not Suppose To Be Here!
                <br/>
                Please Report This Error!
              </p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light float-right"
                type="button" name="action" onClick={this.Wrong}>
                Click Here To Return
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}