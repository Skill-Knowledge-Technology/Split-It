import React from 'react';

export default class Step2EZ extends React.Component {
  next = e => {
    e.preventDefault();
    if(this.props.EZSplit.totalPeople <= 0 || this.props.EZSplit.EZcost < 0){
      alert("Please Enter a Valid Number For People or Cost To Proceed");
    }
    else{
      this.props.changeEZTotal(this.total(this.props.EZSplit.totalPeople,this.props.EZSplit.EZcost));
      this.props.nextStep();
    }
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  total(totalPeople,cost){
    var total = cost/totalPeople; // Total
    total = Math.ceil(total * 100) / 100; // Round Up
    if (total === Infinity || isNaN(total)){ // Checks for Fail
      return("Invalid Inputs");
    }
    return(total);
  }

  render(){ 
    const { EZSplit, handleChange } = this.props;
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
              <form className = "col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">people</i>
                    <input type="number" min="1" placeholder="Total Number of People" className="validate"
                      value={EZSplit.totalPeople} onChange={handleChange('totalPeople')}/>
                    <label className="active">Total Number of People</label>
                    <span className="helper-text" data-error="Invalid" data-success="Valid">Please Enter a Valid Number</span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">payment</i>
                    <input type="number" min="0" step="0.01" placeholder="Total Cost" className="validate"
                    value={EZSplit.EZcost} onChange={handleChange('EZcost')}/>
                    <label className="active">Total Cost</label>
                    <span className="helper-text" data-error="Invalid" data-success="Valid">Please Enter a Valid Number</span>
                  </div>
                </div>
                <div className = "row">
                  <div className="input-field col s12">
                    <p>Total Cost Per Person</p> 
                    ${this.total(EZSplit.totalPeople,EZSplit.EZcost)}
                  </div>
                </div>
              </form>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick={this.next}>
                Next
                <i className="material-icons right">navigate_next</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}