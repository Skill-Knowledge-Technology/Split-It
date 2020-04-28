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
            requesterID: this.props.userID,
            addresseeID: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ usernameToSearch: e.target.value}, () => {
            // console.log("usernameToSearch is " + this.state.usernameToSearch)
            this.handleSearch(String(this.state.usernameToSearch));
        })
    }

    handleSearch(username) {
      API.searchByUsername(username)
      .then((res) => {
        // console.log(res.data)
        if (res.data) {
          this.setState({isFound: true, addresseeID: res.data.userID})
        }
        else {
          this.setState({isFound: false, addresseeID: null})
        }
      })
      .catch((err) => {
        console.log("search error: " + err)
      })
    }


    handleSubmit() {
      let newFriendship = {
        requesterID: this.state.requesterID,
        addresseeID: this.state.addresseeID
      };
      API.createFriendship(newFriendship)
      .then((res) => {
        console.log("new friendship: " + res)
      })
      .catch((err) => {
        console.log("error: " + err)
      })
    }


    render() {
      const requesterID = this.props.userID;
        return (
            <div>
                <form>
                    <label>
                        Search for a friend!
                   <input
                            type="text"
                            value={this.state.usernameToSearch}
                            onChange={this.handleChange}
                            style={{
                                color:"white"
                            }}
                        />
                    </label>
                </form>
                <a
                  className="waves-effect waves-light btn"
                  onClick={() => this.handleSubmit()}
                  disabled={this.state.isFound === false}
                >Send Friend Request</a>

            </div>
        )
    }

}


export default withRouter(Friends);