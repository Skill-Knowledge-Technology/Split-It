import React from 'react';
import './UserInput.css'
import Step1 from './Step1'
import Step2EZ from './Step2EZ'
import Step3EZ from './Step3EZ'
import Step2Detailed from './Step2Detailed'
import Step3Detailed from './Step3Detailed'
import Step4Detailed from './Step4Detailed'
import Step5Detailed from './Step5Detailed'
import Step6Detailed from './Step6Detailed'
import Step7Detailed from './Step7Detailed'
import WrongPage from './WrongPage'

export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentStep: 1,
        totalPeople: '',
        EZcost: '',
        EZtotal: '',
        totalOrders: '',
        names: [],
        orders: [],
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

  changePeopleOrder = (totalPeople,totalOrders) => {
    var i;
    var temp = [];
    for(i = 0; i < totalPeople; i++){
        temp.push({number: `Person ${i+1}`, name: '', cost: 0});
    }
    this.setState({names: temp});
    temp = [];
    for(i = 0; i < totalOrders; i++){
      temp.push({number: `Order #${i+1}`, quantity: '', order: '', cost: '', total: '', association: []});
    }
    this.setState({orders: temp});
  }

  changeNames = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.names[index].name = e.target.value;
    this.setState(newState);
  }

  setNames = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      if(newState.names[i].name === ''){
        newState.names[i].name = newState.names[i].number;
        this.setState(newState);
      }
    }
  }

  changeOrderQuantity = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].quantity = e.target.value;
    this.setState(newState);
  }

  setOrderQuantity = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      if(newState.orders[i].quantity === ''){
        newState.orders[i].quantity = 1;
        this.setState(newState);
      }
    }
  }

  changeOrders = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].order = e.target.value;
    this.setState(newState);
  }

  setOrders = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      if(newState.orders[i].order === ''){
        newState.orders[i].order = newState.orders[i].number;
        this.setState(newState);
      }
    }
  }

  changeOrderCost = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].cost = e.target.value;
    this.setState(newState);
  }

  setOrderCost = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      if(newState.orders[i].cost === ''){
        newState.orders[i].cost = 0;
        this.setState(newState);
      }
    }
  }

  setOrderTotal = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      var quantity = newState.orders[i].quantity;
      var cost = newState.orders[i].cost;
      newState.orders[i].total = cost * quantity;
      this.setState(newState);
    }
  }

  changeAssociation = (index,value) => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].association = value;
    this.setState(newState);
  }

  resetAssociation = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      newState.orders[i].association = [];
      this.setState(newState);
    }
  }

  setNameCost = (name, total) => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      if(newState.names[i].name === name){
        newState.names[i].cost += total;
        this.setState(newState);
      }
    }
  }

  resetNameCost = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      newState.names[i].cost = 0;
      this.setState(newState);
    }
  }

  render() {
    const { currentStep , totalPeople } = this.state;
    const { EZcost, EZtotal } = this.state;
    const EZSplit = { totalPeople, EZcost, EZtotal };
    const { totalOrders, names, orders} = this.state;
    const DetailedSplit = { totalPeople, totalOrders, names, orders};

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
              prevStep = {this.prevStep}
              changeEZTotal = {this.changeEZTotal}
              handleChange = {this.handleChange}
              EZSplit = {EZSplit}
            />
          </div>
        );
      case 3:
        return(
          <div className = "container">
            <Step3EZ
              prevStep = {this.prevStep}
              EZSplit = {EZSplit}
            />
          </div>
        );
      case 102:
        return(
          <div className = "container">
            <Step2Detailed
              nextStep = {this.nextStep}
              prevJump = {this.prevJump}
              changePeopleOrder = {this.changePeopleOrder}
              handleChange = {this.handleChange}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 103:
        return(
          <div className = "container">
            <Step3Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              changeNames = {this.changeNames}
              setNames = {this.setNames}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 104:
        return(
          <div className = "container">
            <Step4Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              changeOrderQuantity = {this.changeOrderQuantity}
              changeOrders = {this.changeOrders}
              changeOrderCost = {this.changeOrderCost}
              setOrderQuantity = {this.setOrderQuantity}
              setOrders = {this.setOrders}
              setOrderCost = {this.setOrderCost}
              setOrderTotal = {this.setOrderTotal}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 105:
        return(
          <div className = "container">
            <Step5Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              changeAssociation = {this.changeAssociation}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 106:
        return(
          <div className = "container">
            <Step6Detailed
              nextStep = {this.nextStep}
              prevStep = {this.prevStep}
              resetAssociation = {this.resetAssociation}
              setNameCost = {this.setNameCost}
              DetailedSplit = {DetailedSplit}
            />
          </div>
        );
      case 107:
        return(
          <div className = "container">
            <Step7Detailed
              prevStep = {this.prevStep}
              resetNameCost = {this.resetNameCost}
              DetailedSplit = {DetailedSplit}
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