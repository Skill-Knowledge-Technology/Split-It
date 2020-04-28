import React from "react";
import "./Profile.css";
import { withRouter } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      balance: this.props.balance,
      uploads: this.props.image,
      edit: false,
    };
  }

  // Handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
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

  // eventually api call to call the backend
  handleSubmit = (e) => {
    e.preventDefault();
    // Insert Backend Here.
    console.log(this.state);
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ edit: !this.state.edit});
  };
  
  render() {
    const {name, email, balance, uploads} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Profile</span>
                {!this.state.edit && 
                  (
                  <div className="container">
                    <div className="center-align">
                      <img src={uploads} width="200" className="circle responsive-img" alt="Empty"/>
                    </div>
                    <div className="row">
                      <label for="username" className="active">Username: </label>
                      <i className="material-icons left">account_box</i>
                      <span id="username"> {name}</span>
                    </div>
                    <div className="row">
                      <label for="email" className="active">E-mail: </label>
                      <i className="material-icons left">email</i>
                      <span id="email"> {email}</span>
                    </div>
                    <div className="row">
                      <label for="balance" className="active">Current Balance: </label>
                      <i className="material-icons left">account_balance_wallet</i>
                      <span for="balance"> ${balance}</span>
                    </div>
                    <div className="row">
                      <div className="left">
                        <button className="btn" type="edit" name="action"
                          onClick={this.handleEdit}>
                          Edit
                          <i className="material-icons right">edit</i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.edit && 
                  (
                  <div className="container">
                    <div className="center-align">
                      <div>
                        <img src={uploads} width="200" className="circle responsive-img" alt="Empty"/>
                      </div>
                      <div>
                        <input type="file" onChange={this.handleImageChange} accept="image/*"/>
                      </div>
                    </div>
                    <div className="row">
                      <label for="username" className="active">Username: </label>
                      <i className="material-icons left">account_box</i>
                      <span id="username"> {name}</span>
                    </div>
                    <form>
                      <div className="row">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">email</i>
                          <label for="email" className="active">E-mail</label>
                          <input id="email" type="email" placeholder="Enter Email" className="validate"
                            value={email} onChange={this.handleChange("email")}/>
                          <span className="helper-text" data-error="Invalid Email" data-success="Valid">
                            Please Enter a Valid Email
                          </span>
                        </div>
                      </div>
                    </form>
                    <div className="row">
                      <label for="balance" className="active">Current Balance: </label>
                      <i className="material-icons left">account_balance_wallet</i>
                      <span for="balance"> ${balance}</span>
                    </div>
                    <div className="row">
                      <div className="left">
                        <button className="btn" type="submit" name="action"
                          onClick={this.handleSubmit}>
                          Save
                          <i className="material-icons right">save</i>
                        </button>
                        </div>
                        <div className="right">
                        <button className="btn" type="edit" name="action"
                          onClick={this.handleEdit}>
                          Cancel
                          <i className="material-icons right">cancel</i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);