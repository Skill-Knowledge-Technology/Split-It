import React from "react";
import "./Friends.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/api";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameToSearch: "",
      isFound: false,
      myName: this.props.username,
      requesterID: this.props.userID,
      addresseeID: "",
      friendRequests: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("component did mount");
    API.getFriendRequests(this.state.requesterID)
      .then(res => {
        console.log("res is " + JSON.stringify(res.data, null, 2));
        const myfriendRequests = res.data;
        this.setState({
          friendRequests: myfriendRequests
        }, () => {
          console.log("state.friendRequests is " + this.state.friendRequests);
          console.log("tpype of is " + typeof(this.state.friendRequests));
        })
      })
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
      })
      .catch((err) => {
        console.log("error: " + err)
      })
  }

  render() {
    const { friendRequests } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
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
                  <button className="waves-effect waves-light btn"
                    onClick={() => this.handleSubmit(this.bind)} disabled={(this.state.isFound === false) || (this.state.myName === this.state.usernameToSearch)}>
                    Send Friend Request
                </button>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="col s12 m12 l12">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">My Friend Requests</span>
                    <div>
                      <ul>
                        {this.state.friendRequests.map((friendRequests, idx) => <li key={idx}>
                          UserID: {friendRequests.requesterID}</li>)}
                      </ul>
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