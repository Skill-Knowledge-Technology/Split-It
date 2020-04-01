import React from 'react';
import './Camera.css'

var Tesseract = window.Tesseract;

export default class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: '',
      patterns: '',
      pattern: [],
      text: '',
      confidence: '',
      found: false
    };
  }

  handleChange = (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    let reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }

    reader.onloadend = (e) => {
      this.setState({
        uploads: [reader.result]
      });
    }

    reader.readAsDataURL(file);
  }

  generateText = () => {
    let uploads = this.state.uploads
  
    for(var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(uploads[i], {
        lang: 'eng'
      })
      .catch(err => {
        console.error(err)
      })
      .then(result => {
        // Get Confidence score
        let confidence = result.confidence
  
        // Get full output
        let text = result.text
  
        // Get codes
        let pattern = /\b\w{10,10}\b/g
        let patterns = result.text.match(pattern);
  
        // Update state
        this.setState({ 
            patterns: this.state.patterns.concat(patterns),
            pattern: patterns,
            text: text,
            confidence: confidence,
            found: true
        })
      })
    }

  }

  render() {
    return (
      <div className = "container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <div className = "container">
                  <div className="file-field input-field">
                    <div className="btn">
                      <input type="file" onChange={this.handleChange} accept="image/*"/>
                      <span>Upload File</span>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div>
                  <div className="card-image">
                    <img src = {this.state.uploads} alt = "" />
                  </div>
                  <br/>
                  <div className = "center-align">
                    <button className="btn waves-effect waves-light" type="submit" onClick={this.generateText}>Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                  <br/>
                  {this.state.found &&
                  (
                    <div className="container">
                      <p><strong>Confidence Score:</strong> {this.state.confidence}</p>
                      <br/>
                      <p><strong>Pattern Output:</strong> {this.state.pattern.map((pattern) => { return pattern + ', ' })}</p>
                      <br/>
                      <p><strong>Full Output:</strong> {this.state.text}</p>
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