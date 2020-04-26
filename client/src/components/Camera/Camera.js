import React from 'react';
import Tesseract from 'tesseract.js';
import './Camera.css'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import WrongPage from './WrongPage'
import API from "../../utils/api";

export default class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      uploads: '',
      text: '',
      subtotal: 0,
      tax: 0,
      taxPercent: 0,
      total: 0,
      orders: [],
      names: [{number: `Person 1`, name: '', check: false, found: false, subtotal: 0, tax: 0, total: 0}],
      failAttempts: 0,
      found: false,
      loading: false,
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

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  changeSubtotal = (newValue) => {
    this.setState({subtotal: newValue});
  }

  changeTax = (newValue) => {
    this.setState({tax: newValue});
  }

  setTax = () => {
    if(this.state.tax === ''){
      this.setState({tax: 0});
    }
  }

  changeTaxPercent = (subtotal,tax) => {
    var taxPercent = tax/subtotal;
    this.setState({taxPercent: taxPercent});
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
    this.setState({ loading: true });
    var uploads = this.state.uploads;
    for(var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(
        uploads[i], 
        'eng',
      )
      .then(({ data: { text } }) => {
        // console.log(text);
        this.setState({ 
          text: text,
          found: true,
          loading: false,
        })
        this.parse();
        this.nextStep();
      })
      .catch(err => {
        console.error(err);
        this.setState({
          failAttempts: this.state.failAttempts + 1,
          loading: false,
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
    var text = this.state.text;
    var number = 1;
    var tempOrders = [];
    text.split('\n').map((item) => {
      var array = item.split(' ');
      // console.log(array);
      // This searches for tax
      if(array.findIndex(word => 'tax' === word.toLowerCase()) > -1){
        this.changeTax(array[array.length-1]);
      }
      // This is for finding orders and saving into the state orders.
      else if(!isNaN(array[0]) && !isNaN(array[array.length-1]) && array[0] !== ''){
        var size = array.length;
        var quantity = array[0];
        var cost = array[size-1];
        var order = array.slice(1,size-1).join(" ");
        tempOrders.push({number: `Order #${number}`, quantity: quantity, order: order, cost: cost, association: []});
        number++;
      }
    })
    this.setState({ orders: tempOrders })
  }

  resetParse = () =>{
    this.setState({ subtotal: 0 });
    this.setState({ tax: 0 });
    this.setState({ taxPercent: 0 });
    this.setState({ total: 0 });
    this.setState({ orders: [] });
  }

  changeOrderQuantity = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].quantity = e.target.value;
    this.setState(newState);
  }

  checkOrderQuantity = () => {
    var size = this.state.orders.length;
    for (var i = 0; i < size; i++){
      if(this.state.orders[i].quantity === '' || this.state.orders[i].quantity <= 0){
        return true;
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

  checkOrderCost = () => {
    var size = this.state.orders.length;
    for (var i = 0; i < size; i++){
      if(this.state.orders[i].cost === '' || this.state.orders[i].cost < 0){
        return true;
      }
    }
  }

  removeOrderSpecificRow = (index) => () => {
    var newState = Object.assign({}, this.state);
    newState.orders.splice(index,1);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      newState.orders[i].number = `Order #${i + 1}`;
    }
    this.setState(newState);
  }

  addOrderRow = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    newState.orders.push({number: `Order #${size + 1}`, quantity: '', order: '', cost: '', association: []});
    this.setState(newState);
  }

  changeNames = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.names[index].name = e.target.value;
    this.setState(newState);
    if(newState.names[index].check && e.target.value !== '') {
      this.userSearch(index);
    }
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

  changeCheck = (index) => e => {
    var newState = Object.assign({}, this.state);
    newState.names[index].check = e.target.checked;
    this.setState(newState);
    if(newState.names[index].check && newState.names[index].name !== '') {
      this.userSearch(index);
    }
  }

  userSearch = (index) => {
    var newState = Object.assign({}, this.state);
    var username = this.state.names[index].name;
    API.searchByUsername(username)
      .then((res) => {
      if (res.data !== null) {
        console.log("found");
        newState.names[index].found = true;
      }
      else {
        console.log("not found");
        newState.names[index].found = false;
      }
    })
    this.setState(newState);
  }

  checkUsers = () => {
    var size = this.state.names.length;
    for(var i = 0; i < size; i++){
      if(this.state.names[i].check === true && this.state.names[i].found === false){
        alert(this.state.names[i].name + " Is Not A User!");
        return false;
      }
    }
    return true;
  }

  removeNameSpecificRow = (index) => () => {
    var newState = Object.assign({}, this.state);
    newState.names.splice(index,1);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      newState.names[i].number = `Person ${i + 1}`;
    }
    this.setState(newState);
  }

  addNameRow = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    newState.names.push({number: `Person ${size + 1}`, name: '', check: false, found: false, subtotal: 0, tax: 0, total: 0});
    this.setState(newState);
  }

  changeAssociation = (index,value) => {
    var newState = Object.assign({}, this.state);
    newState.orders[index].association = value;
    this.setState(newState);
  }

  checkAssociation = () => {
    var size = this.state.orders.length;
    for (var i = 0; i < size; i++){
      if(this.state.orders[i].association.length === 0){
        return true;
      }
    }
  }

  resetAssociation = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.orders.length;
    for (var i = 0; i < size; i++){
      newState.orders[i].association = [];
      this.setState(newState);
    }
  }

  setNameSubtotal = (name, total) => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      if(newState.names[i].name === name){
        newState.names[i].subtotal += total;
        this.setState(newState);
      }
    }
  }

  setNamePayment = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      var subtotal = newState.names[i].subtotal;
      var tax = Math.ceil(subtotal * this.state.taxPercent * 100) / 100;
      var total = (Math.round((+subtotal + +tax) *1e12)/1e12);
      newState.names[i].tax = tax;
      newState.names[i].total = total;
      this.setState(newState);
    }
  }

  resetNamePayment = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    for (var i = 0; i < size; i++){
      newState.names[i].subtotal = 0;
      newState.names[i].tax = 0;
      newState.names[i].total = 0;
      this.setState(newState);
    }
  }

  setNameTotal = () => {
    var newState = Object.assign({}, this.state);
    var size = newState.names.length;
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    for(var i = 0; i < size; i++){
      subtotal = (Math.round((+subtotal + +newState.names[i].subtotal) *1e12)/1e12);
      tax = (Math.round((+tax + +newState.names[i].tax) *1e12)/1e12);
      total = (Math.round((+total + +newState.names[i].total) *1e12)/1e12);
    }
    newState.names.push({number: `Total`, name: 'Total', subtotal: subtotal, tax: tax, total: total});
    this.setState(newState);
  }

  resetNameTotal = () => {
    var newState = Object.assign({}, this.state);
    newState.names.pop();
    this.setState(newState);
  }

  render() {
    const { currentStep, uploads, text, subtotal, tax, total, orders, names, failAttempts, found, loading } = this.state;
    const Camera = { uploads, text, subtotal, tax, total, orders, names, failAttempts, found };

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
              loading = {loading}
            />
          </div>
        );
      case 2:
        return(
          <div className = "container">
            <Step2
              prevStep = {this.prevStep}
              nextStep = {this.nextStep}
              resetParse = {this.resetParse}
              handleChange = {this.handleChange}
              changeSubtotal = {this.changeSubtotal}
              changeTotal = {this.changeTotal}
              setTax = {this.setTax}
              changeTaxPercent = {this.changeTaxPercent}
              changeOrderQuantity = {this.changeOrderQuantity}
              changeOrders = {this.changeOrders}
              changeOrderCost = {this.changeOrderCost}
              checkOrderQuantity = {this.checkOrderQuantity}
              setOrders = {this.setOrders}
              checkOrderCost = {this.checkOrderCost}
              removeOrderSpecificRow = {this.removeOrderSpecificRow}
              addOrderRow = {this.addOrderRow}
              Camera = {Camera}
            />
          </div>
        );
      case 3:
        return(
          <div className = "container">
            <Step3
              prevStep = {this.prevStep}
              nextStep = {this.nextStep}
              changeNames = {this.changeNames}
              changeCheck = {this.changeCheck}
              removeNameSpecificRow = {this.removeNameSpecificRow}
              addNameRow = {this.addNameRow}
              setNames = {this.setNames}
              userSearch = {this.userSearch}
              checkUsers = {this.checkUsers}
              Camera = {Camera}
            />
          </div>
        );
      case 4:
        return(
          <div className = "container">
            <Step4
              prevStep = {this.prevStep}
              nextStep = {this.nextStep}
              changeAssociation = {this.changeAssociation}
              checkAssociation = {this.checkAssociation}
              Camera = {Camera}
            />
          </div>
        );
      case 5:
        return(
          <div className = "container">
            <Step5
              prevStep = {this.prevStep}
              nextStep = {this.nextStep}
              resetAssociation = {this.resetAssociation}
              setNameSubtotal = {this.setNameSubtotal}
              setNamePayment = {this.setNamePayment}
              setNameTotal = {this.setNameTotal}
              Camera = {Camera}
            />
          </div>
        );
      case 6:
        return(
          <div className = "container">
            <Step6
              prevStep = {this.prevStep}
              resetNameTotal = {this.resetNameTotal}
              resetNamePayment = {this.resetNamePayment}
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