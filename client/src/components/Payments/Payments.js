import React from "react";
import "./Payments.css";
import { withRouter } from "react-router-dom";
import M from 'materialize-css'
import API from "../../utils/api";


class Payments extends React.Component {
  componentDidMount() {
    M.AutoInit();

    API.getPartTransactions(this.state.userID)
      .then(res => {
        const partTransactions = res.data;
        this.setState({
          partTransactions: partTransactions
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      balance: this.props.balance,
      amountToAdd: "",
      userID: this.props.userID,
      partTransactions: [],
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

  pay = (transactionID, participantTotal) => e => {
    e.preventDefault();
    if (this.state.balance >= participantTotal) {
      // 1. Using transactionID, get the transaction's ownerID
      API.getTransaction(transactionID)
        .then((res) => {
          // variables in the data object MUST match with controller
          let receiverId = res.data.ownerID;
          let senderId = this.state.userID;
          let balanceToTransfer = participantTotal;
          let transactionId = transactionID;
          let data = { receiverId, balanceToTransfer, transactionId };
          //2. Perform transferBalance API call
          API.transferBalance(senderId, data)
            .then(() => {
              alert("Transaction Paid!")
              //3. reload the component to update state
              this.componentDidMount();
            })
        })
        .catch((err) => {
          console.log("error: " + err)
        })
    }
    else {
      alert("You Cannot Afford This Payment!\nPlease Add Some Funds!");
    }
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
                        <label className="active">Current Balance: </label>
                        <i className="material-icons left">account_balance_wallet</i>
                        <span id="balance"> ${balance}</span>
                      </div>
                    </div>
                    <div className="row">
                      {this.state.partTransactions.map((partTransaction, idx) =>
                        !partTransaction.isPaid &&
                        (
                          <div className="col s6 m4" key={`part-${idx}`}>
                            <div className="card white">
                              <div className="card-content black-text">
                                <span className="card-title">TransactionID: {partTransaction.transactionID}</span>
                                <p>Date: {partTransaction.createdAt}</p>
                                <p>My Total: ${partTransaction.participantTotal}</p>
                                <p>Status: {partTransaction.isPaid ? "Paid" : "Not Paid"}</p>
                              </div>
                              <div className="card-action">
                                <button className="btn waves-effect waves-light float-right"
                                  type="button" name="action" onClick={this.pay(partTransaction.transactionID, parseFloat(partTransaction.participantTotal))}>
                                  {/* type="button" name="action" onClick={console.log("TransID: " + partTransaction.transactionID + "   myTotal: " +  typeof(partTransaction.participantTotal))}> */}
                                  Pay
                              </button>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div id="Funds" className="col s12">
                    <div className="row">
                      <div className="col s12">
                        <div className="card white">
                          <div className="card-content black-text">
                            <span className="card-title">Add to Balance</span>
                            <div className="row">
                              <label className="active">Current Balance: </label>
                              <i className="material-icons left">account_balance_wallet</i>
                              <span id="balance"> ${balance}</span>
                            </div>
                            <form>
                              <div className="row">
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">money</i>
                                  <label className="active">Added Balance</label>
                                  <input type="number" min="0.00" max="10000.00" step="0.01"
                                    value={this.state.amountToAdd} onChange={this.handleChange} />
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