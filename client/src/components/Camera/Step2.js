import React from 'react';
import M from 'materialize-css';

export default class Step2 extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  next = e => {
    e.preventDefault();
    var subtotal = this.subtotal(this.props.Camera.orders);
    if (this.props.Camera.orders.length === 0){
      alert("Orders Cannot Be Empty!");
    }
    else if(subtotal < 0){
      alert("Subtotal Cannot Be Negative!");
    }
    else if(this.props.Camera.tax < 0){
      alert("Tax Cannot Be Negative!");
    }
    else if(this.props.checkOrderQuantity()){
      alert("Check The Order Quantity!");
    }
    else if(this.props.checkOrderCost()){
      alert("Check The Order Cost!");
    }
    else{
      this.props.setOrders();
      this.props.setTax();
      this.props.changeSubtotal(subtotal);
      this.props.changeTotal(this.total(subtotal,this.props.Camera.tax))
      this.props.changeTaxPercent(subtotal,this.props.Camera.tax)
      this.props.nextStep();
    }
  };

  back = e => {
    e.preventDefault();
    this.props.resetParse();
    this.props.prevStep();
  };

  subtotal(orders){
    var subtotal = 0;
    var size = orders.length;
    for(var i = 0; i < size; i++){
      subtotal = Math.round((subtotal + +orders[i].cost) *1e12)/1e12;
    }
    return(subtotal);
  }

  total(subtotal,tax){
    return (Math.round((+subtotal + +tax) *1e12)/1e12);
  }

  show = input => e =>{
    e.preventDefault();
    input.orders.map((list) => (
      console.log(list)
    ))
  }

  render(){ 
    const { Camera, handleChange, changeOrderQuantity,changeOrders, changeOrderCost, removeOrderSpecificRow, addOrderRow} = this.props;
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
                    <th>Remove</th>
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
                          <input type="number" min="1" step="1" placeholder="Insert Quantity" className="validate"
                            value={list.quantity} onChange={changeOrderQuantity(index)}/>
                        </form>
                      </td>
                      <td>
                        <form>
                          <input type="text" placeholder="Insert Order"
                            value={list.order} onChange={changeOrders(index)}/>
                        </form>
                      </td> 
                      <td>
                        <form>
                          <input type="number" min="0" step="0.01" placeholder="Insert Cost" className="validate"
                            value={list.cost} onChange={changeOrderCost(index)}/>
                        </form>
                      </td>
                      <td>
                        <button className="btn-floating btn-small red"
                          type="submit" name="action" onClick={removeOrderSpecificRow(index)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td> 
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
              <div className = "row"> 
                <div className = "col s6">
                  <button className="btn-floating btn-large blue"
                    type="submit" name="action" onClick={addOrderRow}>
                    <i className="material-icons">restaurant_menu</i>
                  </button>
                </div>
                <div className = "col s6">
                  <img className="materialboxed" width="100" data-caption="Receipt" src={Camera.uploads} alt= "Receipt"/>
                </div>
              </div>
              <hr/>
              <form className = "col s12">
                <div className="row">
                  <div className="input-field col s4">
                    <label className="active">Subtotal</label>
                    ${this.subtotal(Camera.orders)}
                  </div>
                  <div className="input-field col s4">
                    <label className="active">Tax</label>
                    <input type="number" min="0" step="0.01" placeholder="Insert Tax" className="validate"
                    value={Camera.tax} onChange={handleChange('tax')}/>
                  </div>
                  <div className="input-field col s4">
                    <label className="active">Total</label>
                    ${this.total(this.subtotal(Camera.orders),Camera.tax)}
                  </div>
                </div>
              </form>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick={this.next}>
                Next
                <i className="material-icons right">navigate_next</i>
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
      </div>
    );
  }

}