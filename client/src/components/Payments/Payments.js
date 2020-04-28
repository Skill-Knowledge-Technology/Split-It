import React from "react";
import "./Payments.css";
import { withRouter } from "react-router-dom";


class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
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

  render() {
    const { balance } = this.props;
    return (
      <div className="paymentsbox">
        <h4>
          <u>Payments</u>
        </h4>
        <div className="row">
          <div className="left-align col 12">
            <i className="material-icons prefix">attach_money</i>
          </div>
          <div className="left-align">
            Current Balance
          </div>
          <div id="balance" className="validate" className="left-align">
            {balance}
          </div>
        </div>
        <div className="col s6 m4 l3">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Chris</span>
              <p>10</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light float-right"
                type="button" name="action">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Payments);