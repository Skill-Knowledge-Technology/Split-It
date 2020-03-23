import React from 'react';
import './Profile.css'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
    };
  }

  // Handle field change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // eventually api call to call the backend 
  handleSubmit = e => {
    e.preventDefault();
    // Insert Backend Here.
    console.log(this.state);
  }

  render() {
    return (
      <div className="profilebox">
        <h4><u>Profile</u></h4>
        <form className = "col s12">
           <div className="row">
            <div>
              <img src={ require('../../public/People/dummy.jpg')}  alt = "Empty"/>
            </div>
            <div>
              <input className="file-upload" type="file" accept="image/*"/>
            </div> 
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input placeholder="Name" id="first_name" type="text" onChange={this.handleChange('name')}/>
              <label>Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">local_phone</i>
              <input id="phone" type="tel" placeholder="Phone Number" className="validate" onChange={this.handleChange('phone')}/>
              <label>Phone Number</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" placeholder="Email" className="validate" onChange={this.handleChange('email')} />
              <label>Email</label>
              <span className="helper-text" data-error="Invalid Email" data-success="Valid">Please Enter a Valid Email</span>
            </div>
          </div>
         </form>
         <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>Submit<i className="material-icons right">send</i></button>
      </div> 
    );
  }
}