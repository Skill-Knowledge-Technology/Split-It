import React from 'react';
import Sidebar from './components/Sidebar'
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CameraPage from './pages/CameraPage';
import ManualPage from './pages/ManualPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import './App.css';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Sidebar/>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/RegisterPage" component={RegisterPage} />
                <Route path="/LoginPage" component={LoginPage} />
                <Route path="/CameraPage" component={CameraPage} />
                <Route path="/ManualPage" component={ManualPage} />
                <Route path="/AboutUs" component={AboutUsPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
