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
      const myfriendRequests = res.data;
      myfriendRequests.map((Requests) => {
        var id = Requests.requesterID;
        API.findUser(id)
          .then((res2) => {
            var friend = this.state.friendRequests.concat({ requesterID: Requests.requesterID, addresseeID: Requests.addresseeID, username: res2.data.username} );
            this.setState({ friendRequests: friend })
        })
      })
    });

  API.getMyFriends(this.state.requesterID)
    .then(res => {
      const myFriends = res.data;
      myFriends.map((Friends) => {
        var id = this.isSelf(Friends);
        API.findUser(id)
          .then((res2) => {
            var friend = this.state.myFriends.concat({ requesterID: Friends.requesterID, addresseeID: Friends.addresseeID, username: res2.data.username} );
            this.setState({ myFriends: friend })
        })
      })
    });

    API.getSentRequests(this.state.requesterID)
    .then(res => {
      const sentRequest = res.data;
      sentRequest.map((Sent) => {
        var id = Sent.addresseeID;
        API.findUser(id)
          .then((res2) => {
            var friend = this.state.sentRequests.concat({ requesterID: Sent.requesterID, addresseeID: Sent.addresseeID, username: res2.data.username} );
            this.setState({ sentRequests: friend })
        })
      })
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
    API.findFriendship(this.state.requesterID, this.state.addresseeID)
    .then((res) => {
      console.log("find Friendship res: " + res.data);
      // no friendship found between users
      if (!res.data) {
        let newFriendship = {
          requesterID: this.state.requesterID,
          addresseeID: this.state.addresseeID
        };
        API.createFriendship(newFriendship)
          .then(() => {
            alert("Friend Request sent to " + this.state.usernameToSearch);
            window.location.reload();
          })
          .catch((err) => {
            console.log("error: " + err)
          })
      }
      // friendship already exists - could be friends or pending
      else {
        alert("Friendship already exists - check your Friends or Requests")
      }
    })
    .catch((err) => {
      console.log("error: " + err)
    })
  }

  // function used for deleting requests, sent requests, and friends
  remove = (requesterID, addresseeID) => e => {
    e.preventDefault();  

    API.deleteFriendship(requesterID, addresseeID)
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log("error: " + err)
    });
  }

  // function used to accept friend requests
  accept = (requesterID, addresseeID) => e => {
    e.preventDefault();

    API.acceptRequest(requesterID,addresseeID)
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log("error: " + err)
    });
  }

  // helper function to make sure we dont send the same ID twice in a request
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
                                <span className="card-title">{myFriend.username}</span>
                              </div>
                              <div className="card-action">
                                <button className="btn red waves-effect waves-light float-right"
                                  type="button" name="action" onClick={this.remove(this.state.requesterID, this.isSelf(myFriend))}>
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
                                <span className="card-title">{friendRequests.username}</span>
                              </div>
                              <div className="card-action">
                                <div className="row">
                                  <button className="btn blue waves-effect waves-light left"
                                    // FOR BUTTON: in this case, the logged in user is the recipient so
                                    //  state.receiverID(current user) is sent to accept function as the addressee
                                    type="button" name="action" onClick={this.accept(friendRequests.requesterID, this.state.requesterID)}>
                                    <i className="material-icons left">check</i>
                                    Accept
                                  </button>
                                  <button className="btn red waves-effect waves-light right"
                                    type="button" name="action" onClick={this.remove(this.state.requesterID, this.isSelf(friendRequests))}>
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
                                <span className="card-title">{sentRequest.username}</span>
                              </div>
                              <div className="card-action">
                                <button className="btn red waves-effect waves-light float-right"
                                  type="button" name="action" onClick={this.remove(this.state.requesterID, this.isSelf(sentRequest))}>
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