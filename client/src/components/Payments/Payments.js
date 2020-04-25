import React from "react";
import "./Payments.css";
import { withRouter } from "react-router-dom";


class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            balance: this.props.balance,
        };
    }

    // Handle field change
    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    // eventually api call to call the backend
    handleSubmit = (e) => {
        e.preventDefault();
        // Insert Backend Here.
        console.log(this.state);
    };

    render() {
        const { name, balance } = this.props;
        return (
            <div className="paymentsbox">
                <h4>
                    <u>Payments</u>
                </h4>
                <div className="row">
                    <div class="col 12 12"><p>Chris</p></div>
                    <div class="col 12 18"><p>10</p></div>
                    <div class="col 12 12"><a class="waves-effect waves-light btn">Pay</a></div>
                </div>
            </div>

        );
    }
}

export default withRouter(Payments);