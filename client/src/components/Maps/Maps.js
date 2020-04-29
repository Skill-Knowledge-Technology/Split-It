import React from 'react';
import { withRouter } from "react-router-dom";
import GoogleMaps from '../Google-Maps/GoogleMaps';
import M from 'materialize-css'
import API from "../../utils/api";

class Maps extends React.Component {
  componentDidMount(){
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
      allTransactions: [],
      ownedTransactions: [],
      partTransactions: [],
      username: this.props.username,
      userID: this.props.userID,
    }
  }

  render() {
    return (
      <div>
        <div>
          <ul className="tabs">
            <li className="tab col s4">
              <a className="active" href="#ViewAll">All History</a>
            </li>
            <li className="tab col s4">
              <a href="#Owner">Owned Transactions</a>
            </li>
            <li className="tab col s4">
              <a href="#Participate">Participated Transactions</a>
            </li>
          </ul>
        </div>
        <div>
          <div id="ViewAll" className="col s12">
            <GoogleMaps width={'100%'} height={'82%'} markers={this.state.allTransactions}/>
          </div>
          <div id="Owner" className="col s12">
            <GoogleMaps width={'100%'} height={'82%'} markers={this.state.ownedTransactions}/>
          </div>
          <div id="Participate" className="col s12">
            <GoogleMaps width={'100%'} height={'82%'} markers={this.state.partTransactions}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Maps);
