import React from 'react';
import Tesseract from 'tesseract.js';
import './Camera.css'
import Step1 from './Step1'
import Step2 from './Step2'
import WrongPage from './WrongPage'

export default class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      uploads: '',
      text: '',
      failAttempts: 0,
      found: false,
    };
  }

  wrongStep = () => {
    this.setState({
      currentStep: 1
    });
  };

  nextStep = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1
    });
  };

  prevStep = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1
    });
  };

  handleImageChange = (e) => {
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
        found: false,
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
          found: true,
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
    const { currentStep, uploads, text, failAttempts, found } = this.state;
    const Camera = { uploads, text, failAttempts, found };

    switch (currentStep){
      case 1:
        return(
          <div className = "container">
            <Step1
              nextStep = {this.nextStep}
              handleImageChange = {this.handleImageChange}
              generateText = {this.generateText}
              Camera = {Camera}
            />
          </div>
        );
      case 2:
        return(
          <div className = "container">
            <Step2
              prevStep = {this.prevStep}
              Camera = {Camera}
            />
          </div>
        );
      default:
          return(
            <div className = "container">
              <WrongPage
                wrongStep = {this.wrongStep}
              />
            </div>
          );
        }
      }
    }