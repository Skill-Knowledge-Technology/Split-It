import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:"",
      error: "",
      isAuthenticated: false,
    };
  }
    // save user
    handleUserLogin = (email, password ) => {
      console.log("handleUserLogin function invoked");
      API.loginUser({
        email: email,
        password: password,
      }).then((res) => {
        const { token } = res.data
        localStorage.setItem("jwtToken",token)
        API.setAuthToken(token)
        const decoded = jwt_decode(token)
        this.setState({
          email : res.email,
          password: res.password,
          isAuthenticated: true
        })
        console.log(decoded)
      })
      .catch((error) => {
        this.setState({error})
        console.log(this.setState)
      })
    }


  // havent tested yet lol 
  handleUserLogOut = () => {
    API.logoutUser()
    this.setState({
      email: "",
      password: "",
      error: "",
      isAuthenticated: false,
    })
  }


  render() {
    return (
        <Router>
          <Sidebar/>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/Register" component={Register} />
                <Route path="/Login"    render={(props) => <Login {...props} isAuthenticated={this.state.isAuthenticated} handleUserLogin={this.handleUserLogin}  /> } />
                <Route path="/Camera" component={Camera} />
                <Route path="/UserInput" component={UserInput} />
                <Route path="/AboutUs" component={AboutUs} />
                <Route path="/Maps" component={Maps} />
                <Route path="/Test" component={Test} />
                <Route path="/Profile" component={Profile} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
