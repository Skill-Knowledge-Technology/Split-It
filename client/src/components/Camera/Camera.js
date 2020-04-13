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
      subtotal: 0,
      tax: 0,
      total: 0,
      orders: [],
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

  changeSubtotal = (newValue) => {
    this.setState({subtotal: newValue});
  }

  changeTax = (newValue) => {
    this.setState({tax: newValue});
  }

  changeTotal = (newValue) => {
    this.setState({total: newValue});
  }

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

  parse = () => {
    let text = this.state.text;
    {text.split('\n').map((item, i) => {
      let array = item.split(' ');
      console.log(array);
      if(array.findIndex(word => 'subtotal' === word.toLowerCase()) > -1){
        this.changeSubtotal(array[array.findIndex(word => 'subtotal' === word.toLowerCase()) + 1]);
      }
      else if(array.findIndex(word => 'tax' === word.toLowerCase()) > -1){
        this.changeTax(array[array.findIndex(word => 'tax' === word.toLowerCase()) + 1]);
      }
      else if(array.findIndex(word => 'total' === word.toLowerCase()) > -1){
        this.changeTotal(array[array.findIndex(word => 'total' === word.toLowerCase()) + 1]);
      }
      else if(!isNaN(array[0]) && !isNaN(array[array.length-1])){
        let size = array.length;
        let quanity = array[0];
        let cost = array[size-1];
        let order = array.slice(1,size-1).join(" ");
        console.log(quanity);
        console.log(order);
        console.log(cost);
      }
    })}
  }

  render() {
    const { currentStep, uploads, text, subtotal, tax, total, orders, failAttempts, found } = this.state;
    const Camera = { uploads, text, subtotal, tax, total, orders, failAttempts, found };

    switch (currentStep){
      case 1:
        return(
          <div className = "container">
            <Step1
              nextStep = {this.nextStep}
              handleImageChange = {this.handleImageChange}
              generateText = {this.generateText}
              parse = {this.parse}
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