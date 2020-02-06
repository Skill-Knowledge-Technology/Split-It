import React , { Component }from 'react';
import { Link } from 'react-router-dom';
import './Register.css';


export default class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        email: "",
        password:"",
        password2: "",
        error: ""
      };
    }
        // Handle field change
        handleChange = e => {
          this.setState({[e.target.id]: e.target.value})
      }
       
      // eventually api call to call the backend 
      handleSubmit = e => {
        e.preventDefault()
        const { username, email, password, password2} = this.state
        this.setState({ username, email, password, password2})
        console.log(this.state)
      }
  
  

    render() {
      return (
        <div className="registerbox">
            <h4><u>Fill the Form Below to Register!</u></h4>
            <form>
              <p>Name</p>
              <input type="text" placeholder="Enter Name" onChange={this.handleChange}></input>
              <br/>
              <br/>
              <p>Email</p>
              <input type="text" placeholder="Enter Email" onChange={this.handleChange}></input>
              <br/>
              <br/>
              <p>Password</p>
              <input type="password" placeholder="Enter Password" onChange={this.handleChange}></input>
            </form>
            <button type="button" className="btn btn-primary"> Sign Up</button>
      </div>
      );
    
    }
}

 