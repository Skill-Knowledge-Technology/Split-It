import React from 'react';
import './UserInput.css'

export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container UserInputBox">
        <h2><u>User Input Technique</u></h2>
        <div className="row">
          <div className="col s4 offset-s5">
            <h4>Step 1:</h4>
            <p>EZ Split OR Detailed Split</p>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <h4>Step 2 [EZ Split]:</h4>
            <p>-Obtain Number of People <br/> -Obtain Total Cost + Tax</p>
          </div>
          <div className="col s6">
            <h4>Step 2 [Detailed Split]:</h4>
            <p>-Obtain Number of People <br/> -Obtain Number of Items Ordered</p>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <h4>Step 3 [EZ Split]:</h4>
            <p>-Calculate by Cost/People -> Cost Per Person</p>
          </div>
          <div className="col s6">
            <h4>Step 3 [Detailed Split]:</h4>
            <p>-2 Column List<br/>-Items Name<br/>-Price</p>
            <p>-Displays Total and Allows Input of Tax</p>
            <p>Ex: Steak = $10 + $2 Tax</p>
            <p>Rice = $4 + $1 Tax </p>
            <p>Total = $17 </p>
            <p>Tax = $0 </p>
            <p><u>OR</u></p>
            <p>Ex: Steak = $10</p>
            <p>Rice = $4</p>
            <p>Total = $14 </p>
            <p>Tax = $3 </p>
            <p>System Will Calcuate %Tax Using That and Assign to Each Item Appropriatly</p>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
          </div>
          <div className="col s6">
            <h4>Step 4 [Detailed Split]:</h4>
            <p>-Names of People</p>
            <p>Ex: Steve and Josh</p>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
          </div>
          <div className="col s6">
            <h4>Step 5 [Detailed Split]:</h4>
            <p>-Click and Drag People Into a Box's With Associated Food</p>
            <p>-Give Appropriate Percentages of People Per Food</p>
            <p>Ex: Steak -> Steve (100%)<br/> Rice -> Steve (50%), Josh (50%)</p>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
          </div>
          <div className="col s6">
            <h4>Step 6 [Detailed Split]:</h4>
            <p>-Calculate by Using Cost of Food and Percentage and Tax Per Person For Individual Prices</p>
            <p>Ex: Steak($10 + $2(tax)) -> Steve(100%)) = $12</p>
            <p>Rice ($4 + $1(tax)) -> Steve (50%) = $2.50, Josh (50%) = $2.50</p>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
          </div>
          <div className="col s6">
            <h4>Step 7 [Detailed Split]:</h4>
            <p>-Display Individual Prices</p>
            <p>Ex: Steve $14.50</p>
            <p>Josh = $2.50</p>
          </div>
        </div>
      </div>
    );
  }
}