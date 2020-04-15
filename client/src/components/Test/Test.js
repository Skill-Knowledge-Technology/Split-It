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
      username: value,
      isFound: false
    };
    this.setState({ inputs }, function () {
      this.handleUserSearch(String([this.state.inputs[idx].username]), idx);
    });
  };

  handleAddInput = () => {
    const input = {
      username: "",
      isFound: false
    };
    this.setState({
      inputs: [...this.state.inputs, input]
    });
  };

  handleRemoveInput = (idx) => () => {
    const inputs = [...this.state.inputs];
    inputs.splice(idx, 1);
    this.setState({ inputs });
  }




  handleUserSearch = function (username, idx) {
    console.log("handleUserSearch function invoked");
    API.searchByUsername(username)
      .then((res) => {
        console.log("tried to search for user " + username);
        console.log(res);
        // execute this if a user is found - update this idx's isFound value to true
        if (res.data != null) {
          console.log("found a user");
          console.log("original isFound: " + this.state.inputs[idx].isFound);
          const username = this.state.inputs[idx].username;
          const inputs = [...this.state.inputs];
          inputs[idx] = {
            username: username,
            isFound: true
          };
          this.setState({ inputs }, function () {
            console.log("new isFound: " + this.state.inputs[idx].isFound);
          });
        }
        else {
          console.log("isFound should be false: is actually " + this.state.inputs[idx].isFound)
        };
      })
      .catch((err) => {
        console.log("error:" + err)
      })
  }


  render() {
    return (
      <div>
        <div class="row">
          <form class="col s4 offset-s4">
            <div class="row" id="dynamicInputs">
              {this.state.inputs.map((input, idx) => (
                <div>
                  <input
                    placeholder="Username"
                    id={`input` + idx}
                    type="text"
                    class="validate"
                    value={this.state.inputs[idx].username}
                    onChange={this.handleChange(idx)} />
                  <div>
                    <a
                      class="btn-floating btn-large waves-effect waves-light red"
                      onClick={this.handleRemoveInput(idx)}>
                      <i class="material-icons">delete</i></a>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col s4 offset-s4">
            <a class="waves-effect waves-light btn" onClick={() => this.handleAddInput()}>Add User</a>
          </div>
        </div>
      </div>
    );
  }
}
