import React from 'react';

export default class Step6Detailed extends React.Component {
  next = e => {
    e.preventDefault();
    var ordersSize = this.props.DetailedSplit.orders.length;
    for(var i = 0; i < ordersSize; i++){
      var associationSize = this.props.DetailedSplit.orders[i].association.length;
      for(var j = 0; j < associationSize; j++){
        var name = this.props.DetailedSplit.orders[i].association[j];
        var cost = this.props.DetailedSplit.orders[i].cost;
        var total = this.total(associationSize,cost)
        this.props.setNameCost(name,total);
      }
    }
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.resetAssociation();
    this.props.prevStep();
    alert("Associations Has Been Resetted");
  };

  total(totalPeople,cost){
    var total = cost/totalPeople; // Total
    total = Math.ceil(total * 100) / 100; // Round Up
    return(total);
  }

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
                    <th>Order Names</th>
                    <th>Order Cost</th>
                    <th>Associations</th>
                  </tr>
                </thead>
                <tbody>
                  {DetailedSplit.orders.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.order}
                      </td>
                      <td>
                        ${list.cost}
                      </td>
                      <td>
                        <table>
                          <tbody>
                            {list.association.map((list2, index2) => (
                              <tr key = {index2}>
                                <td>
                                  {list2} Pays ${this.total(list.association.length,list.cost)} For This Order
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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