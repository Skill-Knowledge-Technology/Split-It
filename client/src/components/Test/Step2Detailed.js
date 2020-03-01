import React from 'react';

export default class Step2Detailed extends React.Component {
  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };


  back = e => {
    e.preventDefault();
    this.props.prevJump();
  };

  render(){ 
    const { DetailedSplit, handleChange } = this.props;
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
                    defaultValue={DetailedSplit.people} onChange={handleChange('people')} />
                    <label className="active">Total Number of People</label>
                    <span className="helper-text" data-error="Invalid" data-success="Valid">Please Enter a Valid Number</span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">restaurant_menu</i>
                    <input type="number" min="1" placeholder="Total Orders" className="validate"
                    defaultValue={DetailedSplit.orders} onChange={handleChange('orders')}/>
                    <label className="active">Total Orders</label>
                    <span className="helper-text" data-error="Invalid" data-success="Valid">Please Enter a Valid Number</span>
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