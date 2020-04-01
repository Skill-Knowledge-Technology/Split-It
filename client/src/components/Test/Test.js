import React, { Component } from 'react';
import './Test.css'

var Tesseract = window.Tesseract;

export default class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: [],
      patterns: [],
      documents: []
    };
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key]
        uploads.push(URL.createObjectURL(upload))
      }
      this.setState({
        uploads: uploads
      })
    } 
    else {
      this.setState({
        uploads: []
      })
    }
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
          documents: this.state.documents.concat({
            pattern: patterns,
            text: text,
            confidence: confidence
          })
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
                      <span> Upload File</span>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div>
                  <div>
                    {this.state.uploads.map((value, index) => {
                      return <img key={index} src={value} width="100px" />
                    })}
                  </div>
                  <button className="btn waves-effect waves-light" type="submit" onClick={this.generateText}>Submit
                    <i className="material-icons right">send</i>
                  </button>
                  {this.state.documents.map((value, index) => {
                    return (
                      <div className="container">
                        <div key={index} className="results__result">
                          <div className="results__result__image">
                            <img src={this.state.uploads[index]} width="250px" />
                          </div>
                          <div className="results__result__info">
                            <div className="results__result__info__codes">
                              <small><strong>Confidence Score:</strong> {value.confidence}</small>
                            </div>
                            <div className="results__result__info__codes">
                              <small><strong>Pattern Output:</strong> {value.pattern.map((pattern) => { return pattern + ', ' })}</small>
                            </div>
                            <div className="results__result__info__text">
                              <small><strong>Full Output:</strong> {value.text}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  // render() {
  //   return(
  //     <div className = "TestBox">
  //       This is a test page.
  //     </div>
  //   );
  // }
}