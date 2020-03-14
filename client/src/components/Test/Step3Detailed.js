import React from 'react';

export default class Step3Detailed extends React.Component {
  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };


  back = e => {
    e.preventDefault();
    this.props.prevStep();
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
              <table className="highlight centered">
                <thead>
                  <tr>
                    <th>Number of People</th>
                    <th>Names</th>
                  </tr>
                </thead>
                <tbody>
                  {DetailedSplit.names.map(index => (
                    <tr key = {index.number}>
                      <td>
                        {index.number}
                      </td>
                      <td>
                        <form>
                          <input type="text" placeholder="Insert Name"/>
                        </form>
                      </td> 
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
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