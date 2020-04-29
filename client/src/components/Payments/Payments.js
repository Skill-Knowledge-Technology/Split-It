import React from "react";
import "./Payments.css";
import { withRouter } from "react-router-dom";
import M from 'materialize-css'
import API from "../../utils/api";


class Payments extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

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
        alert("$" + this.state.amountToAdd + " Has Been Added");
        this.setState({ balanceToAdd: "" });
      })
      .catch((err) => {
        console.log("error: " + err)
      })
  }

  render() {
    const { balance } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Payments</span>
                <div className="row">
                  <div className="col s12">
                    <ul className="tabs">
                      <li className="tab col s6">
                        <a className="active" href="#Payments">Pay Payments</a>
                      </li>
                      <li className="tab col s6">
                        <a href="#Funds">Add Funds</a>
                      </li>
                    </ul>
                  </div>
                  <div id="Payments" className="col s12">
                    <div className="row">
                      <div className="col s12">
                        <label  className="active">Current Balance: </label>
                        <i className="material-icons left">account_balance_wallet</i>
                        <span id="balance"> ${balance}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6 m4">
                        <div className="card white">
                          <div className="card-content black-text">
                            <span className="card-title">Name</span>
                            <p>TransactionID: </p>
                            <p>Date: </p>
                            <p>My Total: </p>
                            <p>Location: </p>
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
                  </div>
                  <div id="Funds" className="col s12">
                    <div className="row">
                      <div className="col s12">
                        <div className="card white">
                          <div className="card-content black-text">
                            <span className="card-title">Add to Balance</span>
                            <div className="row">
                              <label  className="active">Current Balance: </label>
                              <i className="material-icons left">account_balance_wallet</i>
                              <span id="balance"> ${balance}</span>
                            </div>
                            <form>
                              <div className="row">
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">money</i>
                                  <label className="active">Added Balance</label>
                                  <input type="number" min="0.00" max="10000.00" step="0.01"
                                    value={this.state.amountToAdd} onChange={this.handleChange}/>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="card-action">
                            <button className="btn"
                              onClick={() => this.handleSubmit(this.bind)} disabled={(isNaN(this.state.amountToAdd))}>
                              Add Amount
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Payments);