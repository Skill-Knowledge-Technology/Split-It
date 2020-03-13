import React from 'react';
import './Test.css'
import Step1 from './Step1'
import Step2EZ from './Step2EZ'
import Step3EZ from './Step3EZ'
import Step2Detailed from './Step2Detailed'
import Step3Detailed from './Step3Detailed'
import Step4Detailed from './Step4Detailed'
import Step5Detailed from './Step5Detailed'
import Step6Detailed from './Step6Detailed'
import Step7Detailed from './Step7Detailed'

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentStep: 1,
        people: '',
        EZcost: '',
        EZtotal: '',
        orders: '',
        names: [],
        orderNumbers: [],
        listNames: [],
        listOrders: [],
        listCost: [],
    };
  }

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

  nextJump = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1 + 100
    });
  };

  prevJump = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1 -100
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  changeEZTotal = (newTotal) => {
    this.setState({EZtotal: newTotal});
  }

  changePeopleOrder = (people,orders) => {
    this.setState({ names: [] });
    this.setState({ orderNumbers: [] });
    this.setState({ listOrders: [] });
    this.setState({ listCost: [] });
    var i;
    var temp = [];
    for(i = 0; i < people; i++){
        temp.push(`Person ${i+1}`);
    }
    this.setState({names: temp});
    temp = [];
    for(i = 0; i < orders; i++){
      temp.push(`Order #${i+1}`);
    }
    this.setState({orderNumbers: temp});
  }

  render() {
    const { currentStep , people } = this.state;
    const { EZcost, EZtotal } = this.state;
    const EZSplit = { people, EZcost, EZtotal };
    const { orders, names, orderNumbers, listNames } = this.state;
    const DetailedSplit = { people, orders, names, orderNumbers, listNames };

    switch (currentStep){
      case 1:
        return(
          <div className = "container">
            <Step1
              nextStep = {this.nextStep}
              nextJump = {this.nextJump}
            />
          </div>
        );
      case 2:
        return(
          <div className = "container">
            <Step2EZ
              nextStep = {this.nextStep}
              prevStep={this.prevStep}
              changeEZTotal={this.changeEZTotal}
              handleChange={this.handleChange}
              EZSplit = {EZSplit}
            />
          </div>
        );
      case 3:
        return(
          <div className = "container">
            <Step3EZ
              prevStep={this.prevStep}
              EZSplit = {EZSplit}
            />
          </div>
        );
      case 102:
        return(
          <div className = "container">
            <Step2Detailed
              nextStep = {this.nextStep}
              prevJump={this.prevJump}
              changePeopleOrder={this.changePeopleOrder}
              handleChange={this.handleChange}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 103:
        return(
          <div className = "container">
            <Step3Detailed
              nextStep = {this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 104:
        return(
          <div className = "container">
            <Step4Detailed
              nextStep = {this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 105:
        return(
          <div className = "container">
            <Step5Detailed
              nextStep = {this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 106:
        return(
          <div className = "container">
            <Step6Detailed
              nextStep = {this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 107:
        return(
          <div className = "container">
            <Step7Detailed
              prevStep={this.prevStep}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
    }
  }
}