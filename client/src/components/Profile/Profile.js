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

    console.log(this.state);
  };
  
  render() {
    const {name, email, balance } = this.props;
    return (
      <div className="profilebox">
        <h4>
          <u>Profile</u>
        </h4>
        <form className="col s12">
          <div className="row">
            <div>
              <img
                src={require("../../public/People/dummy.jpg")}
                class="circle responsive-img"
                alt="Empty"
              />
            </div>
            <div>
              <input className="file-upload" type="file" accept="image/*" />
            </div>
          </div>
          <div className="row">
            <div className="left-align col 12">
              <i className="material-icons prefix">account_circle</i>
            </div>
            <div className="left-align">
              <p id="name">{name}</p>
            </div>
          </div>
          <div className="row">
            <div className="left-align col 12">
              <i className="material-icons prefix">email</i>
            </div>
            <div className="left-align">
              <p id="email" className="validate">
                {email}
              </p>
              {/* <span className="helper-text" data-error="Invalid Email" data-success="Valid">Please Enter a Valid Email</span> */}
            </div>
          </div>
          <div className="row">
            <div className="left-align col 12">
              <i className="material-icons prefix">attach_money</i>
            </div>
            <div className="left-align">
              <p id="balance" className="validate">
                {balance}
              </p>
            </div>
          </div>
        </form>
        <button
          className="btn waves-effect waves-light"
          type="edit"
          name="action"
          onClick={this.handleEdit}
        >
          Edit<i className="material-icons right">edit</i>
        </button>
      </div>
    );
  }
}

export default withRouter(Profile);