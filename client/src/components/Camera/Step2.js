import React from 'react';

export default class Step2 extends React.Component {
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  save = e => {
    e.preventDefault();
    alert("Saved");
  }
  
  parse = () => {
    let text = this.props.Camera.text;
    {text.split('\n').map((item, i) => {
      let array = item.split(' ');
      console.log(array);
    })}
  }

  render(){ 
    const { 
      Camera: { uploads, text }
    } = this.props;
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
              <div className = "col s12">
                <div className = "row">
                  {this.parse()}
                </div>
              </div>
              <button className="btn waves-effect waves-light float-right"
                type="submit" name="action" onClick = {this.save}>
                Save
                <i className="material-icons right">save</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}