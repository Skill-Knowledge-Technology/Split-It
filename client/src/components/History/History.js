import React from "react";
import "./History.css";
import { withRouter } from "react-router-dom";
import M from 'materialize-css'
import API from "../../utils/api";

class History extends React.Component {
  componentDidMount() {
    M.AutoInit();

    API.getAllTransactions(this.state.userID)
      .then(res => {
        const allTransactions = res.data;
        this.setState({
          allTransactions: allTransactions
        });
      });

    API.getOwnedTransactions(this.state.userID)
      .then(res => {
        const ownedTransactions = res.data;
        this.setState({
          ownedTransactions: ownedTransactions
        });
      });

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
      username: this.props.username,
      userID: this.props.userID,
      allTransactions: [],
      ownedTransactions: [],
      partTransactions: []
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">History</span>
                <div className="row">
                  <div className="col s12">
                    <ul className="tabs">
                      <li className="tab col s4">
                        <a className="active" href="#ViewAll">All History</a>
                      </li>
                      <li className="tab col s4">
                        <a className="active" href="#Owner">Owned Transactions</a>
                      </li>
                      <li className="tab col s4">
                        <a href="#Participate">Participated Transactions</a>
                      </li>
                    </ul>
                  </div>
                  <div id="ViewAll" className="col s12">
                    <div className="row">
                      {this.state.ownedTransactions.map((ownTransaction, idx) =>
                        <div className="col s6 m4"  key={`allOwn-${idx}`}>
                          <div className="card white">
                            <div className="card-content black-text">
                              <span className="card-title">TransactionID: {ownTransaction.transactionID}</span>
                              <p><b>Owner</b></p>
                              <p>Date: {ownTransaction.createdAt}</p>
                              <p>Transaction Total: ${ownTransaction.total}</p>
                              <p>Location: {ownTransaction.address}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.partTransactions.map((partTransaction, idx) =>
                        <div className="col s6 m4"  key={`allPart-${idx}`}>
                          <div className="card white">
                            <div className="card-content black-text">
                              <span className="card-title">TransactionID: {partTransaction.transactionID}</span>
                              <p><b>Particpant</b></p>
                              <p>Date: {partTransaction.createdAt}</p>
                              <p>My Total: ${partTransaction.participantTotal}</p>
                              <p>Status: {partTransaction.isPaid ? "Paid" : "Not Paid"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div id="Owner" className="col s12">
                    <div className="row">
                      {this.state.ownedTransactions.map((ownTransaction, idx) =>
                        <div className="col s6 m4"  key={`own-${idx}`}>
                          <div className="card white">
                            <div className="card-content black-text">
                              <span className="card-title">TransactionID: {ownTransaction.transactionID}</span>
                              <p>Date: {ownTransaction.createdAt}</p>
                              <p>Transaction Total: ${ownTransaction.total}</p>
                              <p>Location: {ownTransaction.address}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div id="Participate" className="col s12">
                    <div className="row">
                      {this.state.partTransactions.map((partTransaction, idx) =>
                        <div className="col s6 m4"  key={`part-${idx}`}>
                          <div className="card white">
                            <div className="card-content black-text">
                              <span className="card-title">TransactionID: {partTransaction.transactionID}</span>
                              <p>Date: {partTransaction.createdAt}</p>
                              <p>My Total: ${partTransaction.participantTotal}</p>
                              <p>Status: {partTransaction.isPaid ? "Paid" : "Not Paid"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(History);