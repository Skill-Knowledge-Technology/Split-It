import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import "materialize-css/dist/css/materialize.min.css";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import Payments from './components/Payments/Payments';
import Friends from './components/Friends/Friends';
import History from './components/History/History';
import axios from "axios";

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      this.setAuthToken(token)
      const decoded = jwt_decode(token)
      this.setState({
        userID: decoded.id,
        name: decoded.username,
        isAuthenticated: true
      })
      API.findUser(decoded.id)
        .then((res) => {
          this.setState({ email: res.data.email })
        })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      name: "",
      email: "",
      image: require("./public/People/dummy.jpg"),
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
      const decoded = jwt_decode(token)
      this.setState({
        userID: decoded.id,
        name: decoded.username,
        email: email,
        isAuthenticated: true
      })
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
      errors: [],
      isAuthenticated: false,
    })
    window.location.href = '/'
  }

  redirect = (e) => {
    e.preventDefault();
    window.location.href = '/Login'
  };

  notAuthorized = () => {
    return (
      <div className="container">
       <div className="row">
          <div className="col s12 m12 l12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Bad Access</span>
                <h4> You do not have permission to access this page!</h4>
              </div>
              <div className="card-action">
                <button className="btn-large" type="submit" name="action"
                  onClick={this.redirect}>
                  Click Here To Be Redirected!
                  <i className="material-icons right">compare_arrows</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
        <Router>
          <Sidebar isAuthenticated={this.state.isAuthenticated} name={this.state.name} handleUserLogOut={this.handleUserLogOut} email={this.state.email} image={this.state.image}/>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/Register" component={Register} />
                <Route path="/Login"    render={(props) => <Login {...props} isAuthenticated={this.state.isAuthenticated} errors={this.state.errors} handleUserLogin={this.handleUserLogin}  /> } />
                <Route path="/Camera" render={ (props) => <Camera {...props} isAuthenticated={this.state.isAuthenticated} ownerID={this.state.userID}/>} />
                <Route path="/UserInput" render={ (props) => <UserInput {...props} isAuthenticated={this.state.isAuthenticated} ownerID={this.state.userID}/>} />
                <Route path="/AboutUs" component={AboutUs} />
                <Route path="/Maps" render={ !this.state.isAuthenticated ? (this.notAuthorized) :
                  ((props) => <Maps {...props} name={this.state.name} userID={this.state.userID}/>)} />
                <Route path="/Test" component={Test} />
                <Route path="/Friends" render={ !this.state.isAuthenticated ? (this.notAuthorized) :
                  ((props) => <Friends {...props} userID={this.state.userID} username={this.state.name}/>)} /> 
                <Route path="/Profile" render={ !this.state.isAuthenticated ? (this.notAuthorized) :
                  ((props) => <Profile {...props} name={this.state.name} email={this.state.email} userID={this.state.userID} image = {this.state.image}/>)} />
                <Route path="/Payments" render={ !this.state.isAuthenticated ? (this.notAuthorized) :
                  ((props) => <Payments {...props} name={this.state.name} userID={this.state.userID}/>)} />
                <Route path="/History" render={ !this.state.isAuthenticated ? (this.notAuthorized) :
                  ((props) => <History {...props} name={this.state.name} userID={this.state.userID}/>)} />
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </div>
      </Router>
    );
  }
}


export default App;
