import React from 'react';
import './Camera.css'

export default class Step1 extends React.Component {
  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  handleImageChange = (e) => {
    e.preventDefault();
    this.props.handleImageChange(e);
  }

  generateText = (e) => {
    e.preventDefault();
    this.props.generateText();
  }

  render() {
    const { Camera } = this.props;
    return (
      <div className = "container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <div className = "container">
                  <div className="file-field input-field">
                    <div className="btn">
                      <input type="file" onChange={this.handleImageChange} accept="image/*"/>
                      <span>Upload File</span>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div>
                  <div className="card-image">
                    <img src = {Camera.uploads} alt = "" />
                  </div>
                  <br/>
                  {!Camera.found && 
                  (
                    <div className = "center-align">
                      <button className="btn waves-effect waves-light" type="submit" onClick={this.generateText}>Generate
                        <i className="material-icons right">camera</i>
                      </button>
                    </div>
                  )}
                  {Camera.found &&
                  (
                    <div>
                      <p><strong><u>Text:</u></strong></p>
                      {Camera.text.split('\n').map((item, i) => {
                        return <p key = {i}>
                          {item}
                        </p>
                      })}
                      <br/>
                      <button className="btn waves-effect waves-light" type="submit" onClick={this.next}>Proceed
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}