import React from 'react';
import M from 'materialize-css';
import './Camera.css'

export default class Step1 extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  next = e => {
    e.preventDefault();
    this.props.parse();
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
    const { loading } = this.props;
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
                    <img className="materialboxed" width="250" data-caption="Receipt" src={Camera.uploads} alt=""></img>
                  </div>
                  <br/>
                  {!Camera.found && 
                  (
                    <div className = "center-align">
                      <a href="#click" className="btn-large" type="submit" onClick={this.generateText} disabled={loading || !Camera.uploads}>
                        { loading && 
                        <span> Generating
                          <div className="preloader-wrapper small active">
                            <div className="spinner-layer spinner-blue">
                              <div className="circle-clipper left">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="gap-patch">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="circle-clipper right">
                                <div className="circle">
                                </div>
                              </div>
                            </div>
                            <div className="spinner-layer spinner-red">
                              <div className="circle-clipper left">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="gap-patch">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="circle-clipper right">
                                <div className="circle">
                                </div>
                              </div>
                            </div>
                            <div className="spinner-layer spinner-yellow">
                              <div className="circle-clipper left">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="gap-patch">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="circle-clipper right">
                                <div className="circle">
                                </div>
                              </div>
                            </div>
                            <div className="spinner-layer spinner-green">
                              <div className="circle-clipper left">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="gap-patch">
                                <div className="circle">
                                </div>
                              </div>
                              <div className="circle-clipper right">
                                <div className="circle">
                                </div>
                              </div>
                            </div>
                          </div>
                        </span> 
                        }
                        { !loading && <span> Generate <i className="material-icons right">camera</i> </span> }
                      </a>
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