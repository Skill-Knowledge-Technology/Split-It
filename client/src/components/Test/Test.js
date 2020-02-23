import React from 'react';
import './Test.css'

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentStep: 1,
        currentState: '',
    };
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  // handleSubmit = event => {
  //   event.preventDefault()
  //   const { email, username, password } = this.state
  //   alert(`Your registration detail: \n 
  //          Email: ${email} \n 
  //          Username: ${username} \n
  //          Password: ${password}`)
  // }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button className="btn waves-effect waves-light float-right" 
      type="submit" name="action" onClick={this._prev}>
      Previous
      <i class="material-icons right">send</i>
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button className="btn waves-effect waves-light float-right" 
      type="submit" name="action" onClick={this._next}>
      Previous
      <i class="material-icons right">send</i>
      </button>      
    )
  }
  return null;
}

  render() {
    return (
        <React.Fragment>
        <div className="TestBox container">
            <h1>User Input</h1>
            <p>Step {this.state.currentStep} </p> 
            <p>Curent In {this.state.currentState} </p> 
            <form onSubmit={this.handleSubmit}>
            {/* 
            render the form steps and pass required props in
            */}
            <Step1 
                currentStep={this.state.currentStep} 
                currentState={this.state.currentState}
            />
            <Step2 
                currentStep={this.state.currentStep} 
                handleChange={this.handleChange}
                username={this.state.username}
            />
            <Step3 
                currentStep={this.state.currentStep} 
                handleChange={this.handleChange}
                password={this.state.password}
            />
            {/* {this.previousButton()}
            {this.nextButton()} */}
            </form>
        </div>
        </React.Fragment>
    );
  }
}

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 

    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
  

    return(
      <div className="row">
        <div className="col s12 m6 l6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">EZ Split</span>
              <p>An Easy Computation</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light float-right"
               type="submit" name="action" onClick={handleClick}>
                Click Here
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div className="col s12 m6 l6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Detailed Split</span>
              <p>A More Detailed and Accurate Computation</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light float-right"
              type="submit" name="action">
                Click Here
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      // <div className="form-group">
      //   <label htmlFor="email">Email address</label>
      //   <input
      //     className="form-control"
      //     id="email"
      //     name="email"
      //     type="text"
      //     placeholder="Enter email"
      //     value={props.email}
      //     onChange={props.handleChange}
      //     />
      // </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          className="form-control"
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={props.username}
          onChange={props.handleChange}
          />
      </div>
    );
  }
  
  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
          />      
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
      </React.Fragment>
    );
  }