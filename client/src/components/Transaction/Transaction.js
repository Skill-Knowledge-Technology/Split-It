import React, { Component } from 'react';
import './Transaction.css';
import {	withRouter } from 'react-router-dom';

class Transaction extends Component {
    render() {
        return (
            <div>
                <h3>Hello, world</h3>
            </div>
        )
    }
}

export default withRouter(Transaction);