import React from 'react';

export default class Step2 extends React.Component {
  next = e => {
    e.preventDefault();
    this.props.setOrderQuantity();
    this.props.setOrders();
    this.props.setOrderCost();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  show = input => e =>{
    e.preventDefault();
    input.orders.map((list) => (
      console.log(list)
      ))
  }

  render(){ 
    const { Camera, changeOrderQuantity,changeOrders, changeOrderCost} = this.props;
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
                    <th>Order Quantity</th>
                    <th>Order Names</th>
                    <th>Order Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {Camera.orders.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.number}
                      </td>
                      <td>
                        <form>
                          <input type="text" placeholder="Insert Quantity"
                            defaultValue={list.quantity} onChange={changeOrderQuantity(index)}/>
                        </form>
                      </td>
                      <td>
                        <form>
                          <input type="text" placeholder="Insert Order"
                            defaultValue={list.order} onChange={changeOrders(index)}/>
                        </form>
                      </td> 
                      <td>
                        <form>
                          <input type="number" min="0" step="0.01" placeholder="Insert Cost" className="validate"
                            defaultValue={list.cost} onChange={changeOrderCost(index)}/>
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
              <hr/>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick={this.show(Camera)}>
                Show
                <i className="material-icons right">navigate_next</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}