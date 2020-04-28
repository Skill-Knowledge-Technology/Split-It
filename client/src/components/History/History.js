import React from "react";
import "./History.css";
import { withRouter } from "react-router-dom";
import M from 'materialize-css'
import API from "../../utils/api";

class History extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      userID: this.props.userID,
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
                    Show All Transactions
                  </div>
                  <div id="Owner" className="col s12">
                    Show Only Owner Transactions
                  </div>
                  <div id="Participate" className="col s12">
                    Show Only Participated Transactions
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