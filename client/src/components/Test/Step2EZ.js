import React from 'react';

export default class Step2EZ extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      people: 1,
      cost: 0,
    }
  }

  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };


  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name + ': ' + value)
    this.setState({
      [name]: value
    });
  }

  total(people,cost){
    return(cost/people);
  }

  render(){ 
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
                       name="people" onChange={(e)=>this.handleChange(e)}/>
                      <label className="active">Total Number of People</label>
                      <span className="helper-text" data-error="Invalid" data-success="Valid">Please Enter a Valid Number</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">payment</i>
                      <input type="number" min="0" step="0.01" placeholder="Total Cost" className="validate"
                      name="cost" onChange={(e)=>this.handleChange(e)}/>
                      <label className="active">Total Cost</label>
                      <span className="helper-text" data-error="Invalid" data-success="Valid">Please Enter a Valid Number</span>
                    </div>
                  </div>
                  <div className = "row">
                    <div className="input-field col s12">
                      <p>Total Cost Per Person</p> 
                      {this.total(this.state.people,this.state.cost)}
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