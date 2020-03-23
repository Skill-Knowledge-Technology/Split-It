import React from 'react';

export default class Step7Detailed extends React.Component {
  back = e => {
    e.preventDefault();
    this.props.resetNameCost();
    this.props.prevStep();
  };

  save = e => {
    e.preventDefault();
    alert("Saved");
  }

  show = input => e =>{
    e.preventDefault();
    input.names.map((list) => (
      console.log(list)
      ))
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
                    <th>Names</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {DetailedSplit.names.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.name}
                      </td>
                      <td>
                        $ {list.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick = {this.save}>
                Save
                <i className="material-icons right">save</i>
              </button>
              <hr/>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick={this.show(DetailedSplit)}>
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