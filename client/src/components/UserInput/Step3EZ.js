import React from 'react';
import API from '../../utils/api';
import Autocomplete from 'react-google-autocomplete';
import M from 'materialize-css'

export default class Step3EZ extends React.Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  save = e => {
    e.preventDefault();
    if (this.props.EZSplit.names.length === 0){
      alert("People Cannot Be Empty!");
    }
    else{
      this.props.setNames();
      var array = this.props.EZSplit.names;
      var found = false;
      var valuesSoFar = Object.create(null);
      // Check For Unique Names
      for (var i = 0; i < array.length; i++){
        var value = array[i].name;
        if (value in valuesSoFar){
            found = true;
            break;
        }
        valuesSoFar[value] = true;
      }
      // Check For Users Found
      var findAll = this.props.checkEZUsers();
      if (found){
        alert("Please Make Sure All Names Are Unique!\nAdd a Number After a Name if Needed")
      }
      else if (!found && findAll){
        API.createTransaction({
          ownerID: this.props.Owner.ownerID,
          total: this.props.EZSplit.EZcost,
          address: this.props.Owner.address,
          latitude: this.props.Owner.latitude,
          longitude: this.props.Owner.longitude,
        })
        .then((res) => {
          var size = this.props.EZSplit.names.length;
          for(var i = 0; i < size; i++){
            if (this.props.EZSplit.names[i].id !== this.props.Owner.ownerID){
              API.addParticipant({
                transactionId: res.data.transactionID,
                participantId: this.props.EZSplit.names[i].id,
                participantTotal: this.props.EZSplit.EZtotal,
              })
            }
          }
        })
        .then(() => {
          alert("Saved!");
          window.location.href = '/';
        })
        .catch((error) => {
          console.log("saveTrans: " + error)
        })
      }
    }
  }

  render(){ 
    const { EZSplit, Owner, changeEZNames, removeNameSpecificRow, addNameRow  } = this.props;
    return(
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card blue-grey darken-1">
            <div className="card-action">
              <button className="btn waves-effect waves-light float-left"
                type="submit" name="action" onClick={this.back}>
                Back
                <i className="material-icons left">navigate_before</i>
              </button>
            </div>
            <div className="card-content white-text">
              <table className="highlight centered">
                <thead>
                  <tr>
                    <th>Breakdown</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Total People
                    </td>
                    <td>
                      {EZSplit.totalPeople}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total Cost
                    </td>
                    <td>
                      ${EZSplit.EZcost}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total Cost Per Person
                    </td>
                    <td>
                      ${EZSplit.EZtotal}
                    </td>
                  </tr>
                </tbody>
              </table>
              { Owner.isAuthenticated && (
              // Modal Trigger
              <button className="waves-effect waves-light btn modal-trigger float-right" data-target="modal1">
                Save
                <i className="material-icons right">save</i>
              </button>
              )}
            </div>
          </div>
        </div>
        { Owner.isAuthenticated && (
        // Modal Structure
        <div ref={Modal => {this.Modal = Modal}} id="modal1" className="modal">
          <div className="modal-content">
            <h4>Confirmation Page</h4>
            <hr/>
            <h5>The Following Information Will Be Saved</h5>
            <table className="highlight centered">
              <thead>
                <tr>
                  <th>Number of People</th>
                  <th>Usernames</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {EZSplit.names.map((list, index) => (
                  <tr key = {index}>
                    <td>
                      {list.number}
                    </td>
                    <td>
                      <form>
                        <input type="text" placeholder="Insert Name"
                          value={list.name} onChange={changeEZNames(index)}/>
                      </form>
                    </td>
                    <td>
                      ${EZSplit.EZtotal}
                    </td>
                    <td>
                      <button className="btn-floating btn-small red"
                        type="submit" name="action" onClick={removeNameSpecificRow(index)}>
                        <i className="material-icons">delete</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br/>
            <button className="btn-floating btn-large blue"
              type="submit" name="action" onClick={addNameRow}>
              <i className="material-icons">person_add</i>
            </button>
            <form>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">add_location</i>
                  <label className="active">Enter a Location By Address (Optional)</label>
                  <Autocomplete style={{width: '90%', display:'inline'}} onPlaceSelected={this.selectPlace} 
                    placeholder="Location (Optional)" types={['address']} componentRestrictions={{country: "us"}}/>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="modal-close btn waves-effect waves-light float-right"
              type="submit" name="action" onClick = {this.save}>
              Confirm
              <i className="material-icons right">save</i>
            </button>
          </div>
        </div>
        )}
      </div>
    );
  }
}