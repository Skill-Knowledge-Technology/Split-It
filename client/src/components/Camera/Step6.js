import React from 'react';
import API from '../../utils/api';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import M from 'materialize-css'

export default class Step6 extends React.Component {
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
    this.props.resetNameTotal();
    this.props.resetNamePayment();
    this.props.prevStep();
  };

  save = e => {
    e.preventDefault();
    // console.log("total: " + this.props.Camera.total);
    // console.log("ownerID: " + this.props.Camera.ownerID);
    API.createTransaction({
      ownerID: this.props.Camera.ownerID,
      total: this.props.Camera.total
    })
      .then(() => {
        console.log("transaction created");
        // return <Redirect to="/"/>
      })
      .catch((error) => {
        console.log("saveTrans: " + error)
      })
  }

  selectPlace = (place) => {   
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    var address = place.formatted_address;
    this.props.saveLocation(latitude,longitude,address);
  }

  show = input => e =>{
    e.preventDefault();
    input.names.map((list) => (
      console.log(list)
    ))
  }

  render(){ 
    const { Camera } = this.props;
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
                    <th>Names</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Camera.names.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.name}
                      </td>
                      <td>
                        ${list.subtotal}
                      </td>
                      <td>
                        ${list.tax}
                      </td>
                      <td>
                        ${list.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
              {/* Modal Trigger */}
              <button className="waves-effect waves-light btn modal-trigger float-right" data-target="modal1">
                Save
                <i className="material-icons right">save</i>
              </button>
              {/* <hr/>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick={this.show(Camera)}>
                Show
                <i className="material-icons right">navigate_next</i>
              </button> */}
            </div>
          </div>
        </div>
        {/* Modal Structure */}
        <div ref={Modal => {this.Modal = Modal}} id="modal1" className="modal">
          <div className="modal-content">
            <h4>Confirmation Page</h4>
            <hr/>
            <h5>The Following Information Will Be Saved</h5>
            <table className="highlight centered">
              <thead>
                <tr>
                  <th>Names</th>
                  <th>Total</th>
                  <th>Saved To User</th>
                </tr>
              </thead>
              <tbody>
                {Camera.names.map((list, index) => (
                  <tr key = {index}>
                    <td>
                      {list.name}
                    </td>
                    <td>
                      ${list.total}
                    </td>
                    <td>
                      <label>
                        <input readOnly type="checkbox" className="filled-in"
                          checked={list.check}/>
                        <span></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">add_location</i>
                  <Autocomplete style={{width: '90%', display:'inline'}} onPlaceSelected={this.selectPlace} types={['address']} componentRestrictions={{country: "us"}}/>
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
      </div>
    );
  }
}