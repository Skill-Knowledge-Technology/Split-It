import React from 'react';
import './Test.css';
import API from "../../utils/api";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [{}],
      allUsersFound: false
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
      if (inputs[idx].username) {
        this.handleUserSearch(String([this.state.inputs[idx].username]), idx)
      }
      else {
        console.log("no blanks pls");
      }
    });
  };


  handleAddInput = () => {
    const input = {
      username: "",
      isFound: false
    };
    this.setState({
      inputs: [...this.state.inputs, input],
      allUsersFound: false
    });
  };

  handleRemoveInput = (idx) => () => {
    const inputs = [...this.state.inputs];
    inputs.splice(idx, 1);
    this.setState({ inputs });
  }




  handleUserSearch = function (username, idx) {
    // console.log("handleUserSearch function invoked");
    API.searchByUsername(username)
      .then((res) => {
        console.log("tried to search for user " + username);
        console.log(res);
        // execute this if a user is found - update this idx's isFound value to true
        if (res.data != null) {
          // console.log("found a user");
          // console.log("original isFound: " + this.state.inputs[idx].isFound);
          const username = this.state.inputs[idx].username;
          const inputs = [...this.state.inputs];
          inputs[idx] = {
            username: username,
            isFound: true
          };
          this.setState({ inputs }, function () {
            // console.log("new isFound: " + this.state.inputs[idx].isFound);
          });
        }
        else {
          // console.log("isFound should be false: is actually " + this.state.inputs[idx].isFound)
          return;
        };
      })
      .then(() => {
        let tmp = true;
        for (let index = 0; index < this.state.inputs.length; index++) {
          if (this.state.inputs[index].isFound == false) {
            console.log([index] + ": not found");
            tmp = false;
          }
        }
        if (tmp) {
          console.log("all users found");
          this.setState({
            allUsersFound: true
          });
        }
        else {
          console.log("not all users found");
          this.setState({
            allUsersFound: false
          })
        }
        console.log("allUserFound is " + this.state.allUsersFound);
      })
      .catch((err) => {
        console.log("error:" + err)
      })
  }


  render() {
    return (
      <div>
        <div className="row">
          <form className="col s4 offset-s4">
            <div className="row" id="dynamicInputs">
              {this.state.inputs.map((input, idx) => (
                <div>
                  <input
                    placeholder="Username"
                    id={`input` + idx}
                    type="text"
                    className="validate"
                    value={this.state.inputs[idx].username}
                    onChange={this.handleChange(idx)} />
                  <label for={'input' + idx}>Please enter a registered user</label>
                  <div>
                    <a
                      className="btn-floating btn-large waves-effect waves-light red"
                      onClick={this.handleRemoveInput(idx)}>
                      <i className="material-icons">delete</i></a>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col s4 offset-s4">
            <a 
            className="waves-effect waves-light btn"
             onClick={() => this.handleAddInput()}>Add User</a>
            <a 
            className="waves-effect waves-light btn" 
            onClick={() => console.log("You hit Next")} 
            disabled={this.state.allUsersFound == false}>Next</a>
          </div>
        </div>
      </div>
    );
  }
}
