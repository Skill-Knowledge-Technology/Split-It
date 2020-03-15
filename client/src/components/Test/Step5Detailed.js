import React from 'react';
import M from 'materialize-css'

export default class Step5Detailed extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  
  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render(){ 
    const { DetailedSplit } = this.props;
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
                    <th>Order Number</th>
                    <th>Order Names</th>
                    <th>Choose Names That Are Associated To Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {DetailedSplit.orders.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.number}
                      </td>
                      <td>
                        {list.order}
                      </td>
                      <td>
                        <select multiple>
                          {DetailedSplit.names.map((list2, index2) => (
                            <option key = {index2} value={list2.name}>
                              {list2.name}
                            </option>
                          ))}
                        </select>
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