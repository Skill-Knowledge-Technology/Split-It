import React from 'react';
import './Test.css'

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <div className = "TestBox">
        This is a test page.
      </div>
    );
  }
}