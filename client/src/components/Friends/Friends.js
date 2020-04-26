import React from "react";
import "./Friends.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/api";



class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameToSearch: "",
            isFound: false
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
          this.setState({isFound: true})
        }
        else {
          this.setState({isFound: false})
        }
      })
      .catch((err) => {
        console.log("search error: " + err)
      })
    }

    render() {
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
                  onClick={() => console.log("sent friend request")}
                  disabled={this.state.isFound === false}
                >Send Friend Request</a>

            </div>
        )
    }

}


export default withRouter(Friends);