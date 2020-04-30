import React from "react";
import "./Friends.css";
import { withRouter } from "react-router-dom";
import M from 'materialize-css';
import API from "../../utils/api";

class Friends extends React.Component {
  componentDidMount() {
    M.AutoInit();

    API.getFriendRequests(this.state.requesterID)
      .then(res => {
        console.log("res is " + JSON.stringify(res.data, null, 2));
        const myfriendRequests = res.data;
        this.setState({
          friendRequests: myfriendRequests
        })
      });

    API.getMyFriends(this.state.requesterID)
      .then(res => {
        const myFriends = res.data;
        this.setState({
          myFriends: myFriends
        });
      });

      API.getSentRequests(this.state.requesterID)
      .then(res => {
        const sentRequests = res.data;
        this.setState({
          sentRequests: sentRequests
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      usernameToSearch: "",
      isFound: false,
      myName: this.props.username,
      requesterID: this.props.userID,
      addresseeID: "",
      friendRequests: [],
      myFriends: [],
      sentRequests: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ usernameToSearch: e.target.value }, () => {
      // console.log("usernameToSearch is " + this.state.usernameToSearch)
      this.handleSearch(String(this.state.usernameToSearch));
    })
  }

  handleSearch(username) {
    if (username) {
      API.searchByUsername(username)
        .then((res) => {
          // console.log(res.data)
          if (res.data) {
            this.setState({ isFound: true, addresseeID: res.data.userID })
          }
          else {
            this.setState({ isFound: false, addresseeID: null })
          }
        })
        .catch((err) => {
          console.log("search error: " + err)
        })
    }
    else {
      console.log("no blanks")
    }
  }

  handleSubmit() {
    let newFriendship = {
      requesterID: this.state.requesterID,
      addresseeID: this.state.addresseeID
    };
    API.createFriendship(newFriendship)
      .then(() => {
        alert("Friend Request sent to " + this.state.usernameToSearch);
        this.setState({ usernameToSearch: "" });
        this.componentDidMount();
      })
      .catch((err) => {
        console.log("error: " + err)
      })
  }

  remove = (requesterID) => e => {
    e.preventDefault();
    var userID = this.state.userID;
    // Insert Backend
    this.componentDidMount();
  }

  acceptRequest = (requesterID) => e => {
    e.preventDefault();
    var userID = this.state.userID;
    // Insert Backend
    this.componentDidMount();
  }

  rejectRequest = (requesterID) => e => {
    e.preventDefault();
    var userID = this.state.userID;
    // Insert Backend
    this.componentDidMount();
  }

  cancelRequest = (requesterID) => e => {
    e.preventDefault();
    var userID = this.state.userID;
    // Insert Backend
    this.componentDidMount();
  }

  // helper function to prevent returning own id in 'My Friends'
  isSelf = (friendship) => {
    if (friendship.requesterID == this.state.requesterID) return friendship.addresseeID;
    else return friendship.requesterID;
  }


  render() {
    const { friendRequests, myFriends, sentRequests } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Friends</span>
                  <div className="row">
                    <div className="col s12">
                      <ul className="tabs">
                        <li className="tab col s3">
                          <a className="active" href="#Friends">My Friends</a>
                        </li>
                        <li className="tab col s3">
                          <a href="#Add">Add Friends</a>
                        </li>
                        <li className="tab col s3">
                          <a href="#Requests">Friend Requests</a>
                        </li>
                        <li className="tab col s3">
                          <a href="#Sent">Requests Sent</a>
                        </li>
                      </ul>
                    </div>
                    <div id="Friends" className="col s12">
                      <div className="row">
                        {myFriends.map((myFriend, idx) =>
                          <div className="col s6 m4" key={`friend-${idx}`}>
                            <div className="card white">
                              <div className="card-content black-text">
                                <span className="card-title">UserID: {this.isSelf(myFriend)}</span>
                              </div>
                              <div className="card-action">
                                <button className="btn red waves-effect waves-light float-right"
                                  type="button" name="action" onClick={this.remove(myFriend.requesterID)}>
                                  <i className="material-icons left">delete</i>
                                    Remove Friend
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div id="Add" className="col s12">
                      <div className="row">
                        <div className="col s12">
                          <div className="card white">
                            <div className="card-content black-text">
                              <span className="card-title">Add Friend</span>
                              <form>
                                <div className="row">
                                  <div className="input-field col s12">
                                    <i className="material-icons prefix">group_add</i>
                                    <label className="active">Search For a Friend!</label>
                                    <input type="text" placeholder="Enter Username" id="username"
                                      value={this.state.usernameToSearch} onChange={this.handleChange} />
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="card-action">
                              <button className="waves-effect waves-light btn"
                                onClick={() => this.handleSubmit(this.bind)} disabled={(this.state.isFound === false) || (this.state.myName === this.state.usernameToSearch)}>
                                <i className="material-icons left">person_add</i>
                                Send Friend Requests
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="Requests" className="col s12">
                      <div className="row">
                        {friendRequests.map((friendRequests, idx) =>
                          <div className="col s6 m4" key={idx}>
                            <div className="card white">
                              <div className="card-content black-text">
                                <span className="card-title">UserID: {friendRequests.requesterID}</span>
                              </div>
                              <div className="card-action">
                                <div className="row">
                                  <button className="btn blue waves-effect waves-light left"
                                    type="button" name="action" onClick={this.acceptRequest(friendRequests.requesterID)}>
                                    <i className="material-icons left">check</i>
                                    Accept
                                  </button>
                                  <button className="btn red waves-effect waves-light right"
                                    type="button" name="action" onClick={this.rejectRequest(friendRequests.requesterID)}>
                                    <i className="material-icons left">close</i>
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div id="Sent" className="col s12">
                      <div className="row">
                        {sentRequests.map((sentRequest, idx) =>
                          <div className="col s6 m4" key={`sent-${idx}`}>
                            <div className="card white">
                              <div className="card-content black-text">
                                <span className="card-title">UserID: {sentRequest.addresseeID}</span>
                              </div>
                              <div className="card-action">
                                <button className="btn red waves-effect waves-light float-right"
                                  type="button" name="action" onClick={this.cancelRequest(sentRequest.requesterID)}>
                                  <i className="material-icons left">delete</i>
                                    Remove
                                </button>
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
      </div>
    )
  }
}


export default withRouter(Friends);