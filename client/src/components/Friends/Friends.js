import React from "react";
import "./Friends.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/api";



class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
            usernameToSearch: '',
            isFound: false
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({ usernameToSearch: event.target.usernameToSearch }, function (){
            console.log((String(this.state.usernameToSearch)))
             
        });
    }


    // handleChange = (e) => {
    //     const { username, value } = e.target;
    //     this.setState({ usernameToSearch: username }, function () {
    //         if (username == true) {
    //             this.handleUserSearch(String(this.state.usernameToSearch))
    //         }
    //         else {
    //             console.log("no blanks please");
    //         }
    //     });
    // };



    handleUserSearch = function (username) {
        console.log('username is ' + username)
        // API.searchByUsername(username)
        //     .then((res) => {
        //         console.log("tried to search for user " + username);
        //         console.log(res);
        //         if (res.data != null) {
        //             this.setState({ isFound: true })
        //         }
        //         else {
        //             return;
        //         }


        //     })
    }




    render() {
        const { userID } = this.props;
        return (
            <div>
                <input
                    placeholder="Username"
                    id='usersearchbar'
                    type="text"
                    className="validate"
                    value={this.state.usernameToSearch}
                    onChange={this.handleChange} />
                <label for={'usersearchbar'}> Please enter a registered user</label>
                <div>
                    <a className="waves-effect waves-light btn"
                        onClick={() => console.log(this.state.usernameToSearch)}> Add Friend </a>


                </div>
            </div>
        )



    };

}


export default withRouter(Friends);