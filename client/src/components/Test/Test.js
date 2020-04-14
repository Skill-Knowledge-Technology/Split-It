import React from 'react';
import './Test.css';
import API from "../../utils/api";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [{}]
    };
  }

  handleChange = idx => e => {
    const { username, value } = e.target;
    const inputs = [...this.state.inputs];
    inputs[idx] = {
      username: value
    };
    this.setState({inputs}, function () {
      this.handleUserSearch(String([this.state.inputs[idx].username]));
    });
  };

  handleAddInput = () => {
    const input = {
      username: ""
    };
    this.setState({
      inputs: [...this.state.inputs, input]
    });
  };




  handleUserSearch = username => {
    console.log("handleUserSearch function invoked");
    API.searchByUsername(username)
      .then((res) => {
        console.log("tried to search for user " + username);
        console.log(res);
      })
      .catch((err) => {
        console.log("error:" + err)
      })
  }


  render() {
    return (
      <div>
        <div class="row">
          <form class="col s4">
            <div class="row" id="dynamicInputs">
              {this.state.inputs.map((input, idx) => (
                <input
                  placeholder="Username"
                  id={`input`+ idx}
                  type="text"
                  class="validate"
                  value={this.state.inputs[idx].username}
                  onChange={this.handleChange(idx)} />
              ))};
            </div>
          </form>
        </div>
        <div class="row">
          <a class="waves-effect waves-light btn" onClick={() => this.handleAddInput()}>Add User</a>
        </div>
      </div>
    );
  }
}
