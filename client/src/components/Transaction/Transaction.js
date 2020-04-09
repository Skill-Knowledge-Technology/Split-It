import React, { Component } from 'react';
import './Transaction.css';
import { withRouter } from 'react-router-dom';

// importing Kevin's DetailedSplit components
import Step2Detailed from '../UserInput/Step2Detailed'
import Step3Detailed from '../UserInput/Step3Detailed'
import Step4Detailed from '../UserInput/Step4Detailed'
import Step5Detailed from '../UserInput/Step5Detailed'
import Step6Detailed from '../UserInput/Step6Detailed'
import Step7Detailed from '../UserInput/Step7Detailed'
import WrongPage from '../UserInput/WrongPage'



class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            totalPeople: '',
            totalOrders: '',
            names: [],
            orders: [],
        };
    }

    wrongStep = () => {
        this.setState({
            currentStep: 1
        });
    };

    nextStep = () => {
        const { currentStep } = this.state;
        this.setState({
            currentStep: currentStep + 1
        });
    };

    prevStep = () => {
        const { currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1
        });
    };


    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    changePeopleOrder = (totalPeople, totalOrders) => {
        this.setState({ names: [] });
        this.setState({ orderNumbers: [] });
        var i;
        var temp = [];
        for (i = 0; i < totalPeople; i++) {
            temp.push({ number: `Person ${i + 1}`, name: '', cost: 0 });
        }
        this.setState({ names: temp });
        temp = [];
        for (i = 0; i < totalOrders; i++) {
            temp.push({ number: `Order #${i + 1}`, order: '', cost: '', association: [] });
        }
        this.setState({ orders: temp });
    }

    changeNames = (index) => e => {
        var newState = Object.assign({}, this.state);
        newState.names[index].name = e.target.value;
        this.setState(newState);
    }

    setNames = () => {
        var newState = Object.assign({}, this.state);
        var size = newState.names.length;
        for (var i = 0; i < size; i++) {
            if (newState.names[i].name === '') {
                newState.names[i].name = newState.names[i].number;
                this.setState(newState);
            }
        }
    }

    changeOrders = (index) => e => {
        var newState = Object.assign({}, this.state);
        newState.orders[index].order = e.target.value;
        this.setState(newState);
    }

    setOrders = () => {
        var newState = Object.assign({}, this.state);
        var size = newState.orders.length;
        for (var i = 0; i < size; i++) {
            if (newState.orders[i].order === '') {
                newState.orders[i].order = newState.orders[i].number;
                this.setState(newState);
            }
        }
    }

    changeOrderCost = (index) => e => {
        var newState = Object.assign({}, this.state);
        newState.orders[index].cost = e.target.value;
        this.setState(newState);
    }

    setOrderCost = () => {
        var newState = Object.assign({}, this.state);
        var size = newState.orders.length;
        for (var i = 0; i < size; i++) {
            if (newState.orders[i].cost === '') {
                newState.orders[i].cost = 0;
                this.setState(newState);
            }
        }
    }

    changeAssociation = (index, value) => {
        var newState = Object.assign({}, this.state);
        newState.orders[index].association = value;
        this.setState(newState);
    }

    resetAssociation = () => {
        var newState = Object.assign({}, this.state);
        var size = newState.orders.length;
        for (var i = 0; i < size; i++) {
            newState.orders[i].association = [];
            this.setState(newState);
        }
    }

    setNameCost = (name, total) => {
        var newState = Object.assign({}, this.state);
        var size = newState.names.length;
        for (var i = 0; i < size; i++) {
            if (newState.names[i].name === name) {
                newState.names[i].cost += total;
                this.setState(newState);
            }
        }
    }

    resetNameCost = () => {
        var newState = Object.assign({}, this.state);
        var size = newState.names.length;
        for (var i = 0; i < size; i++) {
            newState.names[i].cost = 0;
            this.setState(newState);
        }
    }

    render() {
        const { currentStep, totalPeople } = this.state;
        const { totalOrders, names, orders } = this.state;
        const DetailedSplit = { totalPeople, totalOrders, names, orders };

        switch (currentStep) {
            case 1:
                return (
                    <div className="container">
                        {/* <Step1
                            nextStep={this.nextStep}
                        /> */}
                    </div>
                );
            case 2:
                return (
                    <div className="container">
                    </div>
                );
            case 3:
                return (
                    <div className="container">
                    </div>
                );
            case 102:
                return (
                    <div className="container">
                        <Step2Detailed
                            nextStep={this.nextStep}
                            changePeopleOrder={this.changePeopleOrder}
                            handleChange={this.handleChange}
                            DetailedSplit={DetailedSplit}
                        />
                    </div>
                );
            case 103:
                return (
                    <div className="container">
                        <Step3Detailed
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            changeNames={this.changeNames}
                            setNames={this.setNames}
                            DetailedSplit={DetailedSplit}
                        />
                    </div>
                );
            case 104:
                return (
                    <div className="container">
                        <Step4Detailed
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            changeOrders={this.changeOrders}
                            changeOrderCost={this.changeOrderCost}
                            setOrders={this.setOrders}
                            setOrderCost={this.setOrderCost}
                            DetailedSplit={DetailedSplit}
                        />
                    </div>
                );
            case 105:
                return (
                    <div className="container">
                        <Step5Detailed
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            changeAssociation={this.changeAssociation}
                            DetailedSplit={DetailedSplit}
                        />
                    </div>
                );
            case 106:
                return (
                    <div className="container">
                        <Step6Detailed
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            resetAssociation={this.resetAssociation}
                            setNameCost={this.setNameCost}
                            DetailedSplit={DetailedSplit}
                        />
                    </div>
                );
            case 107:
                return (
                    <div className="container">
                        <Step7Detailed
                            prevStep={this.prevStep}
                            resetNameCost={this.resetNameCost}
                            DetailedSplit={DetailedSplit}
                        />
                    </div>
                );
            default:
                return (
                    <div className="container">
                        <WrongPage
                            wrongStep={this.wrongStep}
                        />
                    </div>
                );
        }
    }

}

export default withRouter(Transaction);