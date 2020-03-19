import React from 'react';
import './Profile.css'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pnumber: "",
      gender: "",
      image: ""
    };
    
  }
  render() {
    return (
      <div className="ProfileBox">
        <h4><u>Profile Page</u></h4>
        <form className = "col s12">
           <div class="row">
            <div class="small-12 medium-2 large-2 columns">
              <div class="circle">
              <img class="profile-pic" src="http://cdn.cutestpaw.com/wp-content/uploads/2012/07/l-Wittle-puppy-yawning.jpg"/>
            </div>
              <div class="p-image">
                <i class="fa fa-camera upload-button"></i>
                <input class="file-upload" type="file" accept="image/*"/>
              </div> 
            </div> 
          </div>

          <div className="row">
            <div className="input-field col s12">
            <input placeholder="FIRST NAME" id="fname" type="text" className="validate" onChange={this.handleChange}/>
                <label for="fname">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="lname" type="text" placeholder="LAST NAME" className="validate" onChange={this.handleChange}/>
              <label for="lname">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="pnumber" type="text" placeholder="PHONE NUMBER" className="validate" onChange={this.handleChange}/>
              <label for="pbumber">Phone Number</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="gender" type="text" placeholder="GENDER" className="validate" onChange={this.handleChange}/>
              <label for="gender">Gender</label>
            </div>
           </div>
         </form>
        <button class="btn waves-effect waves-light" type="edit" name="action">Edit<i class="material-icons right">edit</i></button>
      </div> 
    );
  }
}