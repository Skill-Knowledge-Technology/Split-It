import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import API from "./utils/api";
import jwt_decode from "jwt-decode";
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Camera from './components/Camera/Camera';
import UserInput from './components/UserInput/UserInput';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Maps from './components/Maps/Maps';
import Test from './components/Test/Test';
import Profile from './components/Profile/Profile';
import Transaction from './components/Transaction/Transaction';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      name: "",
      email: "",
      password: "",
      balance: "",
      errors: [],
      isAuthenticated: false,
    };
  }
   // save user
   handleUserLogin = (email, password) => {
    console.log("handleUserLogin function invoked");
    API.loginUser({
      email: email,
      password: password,
    }).then((res) => {
      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      this.setAuthToken(token)
      console.log(this.setAuthToken(token)) // When I console.log it, this reutrns the data of { token }
      const decoded = jwt_decode(token)
      this.setState({
        userID: decoded.id,
        name: decoded.username,
        email: email,
        password: password,
        isAuthenticated: true
      })
      // finding the banance of the user using an API 
      API.findUserBalance(decoded.id)
        .then((res) => {
          this.setState({
            balance: res.data
          })
        })
      console.log(this.state)
    })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          let errorObject = error.response.data
         //  console.log(typeof(errors)) // object
         let errorArray = []
          errorObject.errors.forEach( data => {
            errorArray.push(data.msg)         
           });
         
         // we want to filter duplicate errors in the array in case the user spams 
         let removeDuplicate = new Set(errorArray)
         this.setState({
           errors: Array.from(removeDuplicate)
         })
       }
      })
  }

  setAuthToken = (token) => {
    if (token) {
      return axios.defaults.headers.common['Authorization'] = token
    }
    else {
      return delete axios.defaults.headers.common['Authorization']
    }
  }

  handleUserLogOut = () => {
    API.logoutUser();
    this.setAuthToken(false);
    this.setState({
      userID: null,
      name: "",
      email: "",
      password: "",
      errors: [],
      isAuthenticated: false,
    })
    window.location.href = '/'
  }

  notAuthorized = () => {
    return (
      <div className="text-align center">
      <h4 span style={{color: 'Red'}}> You do not have permission to access this page</h4>
      </div>
    )
  }


  render() {
    return (
        <Router>
          <Sidebar isAuthenticated={this.state.isAuthenticated} name={this.state.name} handleUserLogOut={this.handleUserLogOut} userID={this.state.userID}/>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/Register" component={Register} />
                <Route path="/Login"    render={(props) => <Login {...props} isAuthenticated={this.state.isAuthenticated} errors={this.state.errors} handleUserLogin={this.handleUserLogin}  /> } />
                <Route path="/Camera" component={Camera} />
                <Route path="/UserInput" component={UserInput} />
                <Route path="/AboutUs" component={AboutUs} />
                <Route path="/Maps" component={Maps} />
                <Route path="/Test" component={Test} />
                <Route path="/Profile/:userID" render={ !this.state.isAuthenticated ? (this.notAuthorized) :
                  ((props) => <Profile {...props} name={this.state.name} email={this.state.email} balance={this.state.balance}/>)} />
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </div>
      </Router>
    );
  }
}


export default App;
