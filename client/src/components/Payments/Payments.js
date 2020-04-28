import React from "react";
import "./Payments.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/api";


class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      balance: this.props.balance,
      amountToAdd: "",
      userID: this.props.userID
    }
    this.handleChange = this.handleChange.bind(this);
  }


  // Handle field change
  handleChange(e) {
    this.setState({ amountToAdd: e.target.value }, () => {
      console.log("changes in amount " + this.state.amountToAdd)
    })
  }


  // eventually api call to call the backend
  handleSubmit() {
    let addBalance = {
      balanceToAdd: this.state.amountToAdd,
      userId: this.state.userID
    };
    API.addToBalance(addBalance)
      .then(() => {
        alert("balance added to account " + this.state.amountToAdd);
        this.setState({ balanceToAdd: "" });
      })
      .catch((err) => {
        console.log("error: " + err)
      })
  }

  render() {
    const { balance } = this.props;
    return (
      <div className="paymentsbox">
        <h4>
          <u>Payments</u>
        </h4>
        <div className="col s6 offset-s3">
          <div className="row">
            <div className="col s2">
              <i className="material-icons prefix">attach_money</i>
            </div>
            <div className="col s4">
              Current Balance
          </div>
            <div id="balance" className="validate" className="col s4">
              {balance}
            </div>
          </div>
        </div>
        <div className="col s6 offset-s3">
          <form>
            <label>
              Input amount to add !
              <input
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={this.state.amountToAdd}
                onChange={this.handleChange}
                style={{ color: "white" }}
              />
            </label>
          </form>
          <a
            className="waves-effect waves-light btn"
            onClick={() => this.handleSubmit(this.bind)}
            disabled={(isNaN(this.state.amountToAdd))}>Add Amount</a>

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