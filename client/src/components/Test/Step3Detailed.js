import React from 'react';

export default class Step3Detailed extends React.Component {
  next = e => {
    e.preventDefault();
    this.props.setNames();
    var array = this.props.DetailedSplit.names;
    var found = false;
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i){
      var value = array[i].name;
      if (value in valuesSoFar){
          found = true;
          break;
      }
      valuesSoFar[value] = true;
    }
    if (found === true){
      alert("Please Make Sure All Names Are Unique!\nAdd a Number After a Name if Needed")
    }
    else{
      this.props.nextStep();
    }
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  show = input => e =>{
    e.preventDefault();
    input.names.map((list) => (
      console.log(list)
      ))
  }

  render(){ 
    const { DetailedSplit, changeNames } = this.props;
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
                    <th>Names (Set Unique Names)</th>
                  </tr>
                </thead>
                <tbody>
                  {DetailedSplit.names.map((list, index) => (
                    <tr key = {index}>
                      <td>
                        {list.number}
                      </td>
                      <td>
                        <form>
                          <input type="text" placeholder="Insert Name"
                            defaultValue={list.name} onChange={changeNames(index)}/>
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