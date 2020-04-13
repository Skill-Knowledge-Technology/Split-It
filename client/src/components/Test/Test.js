import React from 'react';
import './Test.css';
import API from "../../utils/api";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToSearch: "",
      inputs: [{}]
    };
  }

  handleChange = idx => e => {
    const { username, value } = e.target;
    const inputs = [...this.state.inputs];
    inputs[idx] = {
      [username]: value
    };
    this.setState({
      inputs
    });
  };


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

  appendInput = () => {
    console.log("Add User button clicked");
    var newInput = `input-${this.state.inputs.length}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  }

  render() {
    return (
      <div>
        <div class="row">
          <form class="col s12">
            <div class="row" id="dynamicInputs">
              <div class="input-field col s6">
                <input placeholder="Username" id="userToSearch" type="text" class="validate" onChange={this.handleChange('userToSearch')} />
                {this.state.inputs.map(input => <form key={input} />)}
                {/* <label for="userToSearch">Search for Users</label> */}
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <a class="waves-effect waves-light btn" onClick={() => this.appendInput()}>Add User</a>
        </div>
      </div>
    );
  }
}
