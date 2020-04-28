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
      edit: false,
    };
  }

  // Handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // eventually api call to call the backend
  handleSubmit = (e) => {
    e.preventDefault();
    // Insert Backend Here.
    console.log(this.state);
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ edit: !this.state.edit});
    console.log(this.state.edit)
  };
  
  render() {
    const {name, email, balance } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Profile</span>
                <div className="container">
                  <div className="center-align">
                    <img src={require("../../public/People/dummy.jpg")} width="200" className="circle responsive-img" alt="Empty"/>
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
                  <button className="btn" type="edit" name="action"
                    onClick={this.handleEdit}>
                    Edit
                    <i className="material-icons right">edit</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);