import React from 'react';
import './Camera.css'
import Tesseract from 'tesseract.js';

export default class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: '',
      text: '',
      failAttempts: 0,
      found: false
    };
  }

  handleImageChange = (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    let reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }

    reader.onloadend = (e) => {
      this.setState({
        uploads: [reader.result],
        text: '',
        failAttempts: 0,
        found: false
      });
    }
    reader.readAsDataURL(file);
  }

  generateText = () => {
    let uploads = this.state.uploads
    for(var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(
        uploads[i], 
        'eng',
      { logger: m => console.log(m) }
      )
      .then(({ data: { text } }) => {
        console.log(text);
        this.setState({ 
          text: text,
          found: true
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({
          failAttempts: this.state.failAttempts + 1
        });
        if (this.state.failAttempts >= 3){
          alert('Failed To Read Photo!\n' + this.state.failAttempts + '/3\nRedirecting to User Input Page');
          window.location.href = '/UserInput';
        }
        else{
          alert('Failed To Read Photo!\n' + this.state.failAttempts + '/3\nTry Again!');
        }
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
                      <input type="file" onChange={this.handleImageChange} accept="image/*"/>
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
                      <p><strong>Text:</strong></p>
                      {this.state.text.split('\n').map((item, i) => {
                        return <p key = {i}>
                          {item}
                        </p>
                      })}
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