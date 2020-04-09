import React from 'react';
import './Test.css';
import API from "../../utils/api";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToSearch: ""
    };
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value }, function () {
      console.log(this.state.userToSearch);
      this.handleUserSearch(this.state.userToSearch);
    })
  }

  handleUserSearch = username => {
    console.log("handleUserSearch function invoked");
    API.searchByUsername(username)
      .then((res) => {
        console.log("tried to search for user");
        console.log(res);
      })
      .catch((err) => {
        console.log("error:" + err)
      })
  }

  render() {
    return (
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input placeholder="Username" id="userToSearch" type="text" class="validate" onChange={this.handleChange('userToSearch')} />
              <label for="userToSearch">Search for Users</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}