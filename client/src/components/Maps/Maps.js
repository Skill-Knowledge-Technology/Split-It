import React from 'react';
import { withRouter } from "react-router-dom";
import GoogleMaps from '../Google-Maps/GoogleMaps';
import API from "../../utils/api";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      userID: this.props.userID,
    }
  }
    
  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <GoogleMaps width={'100%'} height={'100%'}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Maps);
