import React from 'react';
import Sidebar from './components/Sidebar'
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import AboutUsPage from './pages/AboutUsPage';

import './App.css';


function Navigation(props) {
  return (
    <nav className="nav-extended deep-purple accent-1">
    <div className="nav-wrapper">
    <a href="/" className="brand-logo center" to="/">Split It</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent center">
        <li class="tab"><a href="/">Test 1</a></li>
        <li class="tab"><a href="/">Test 2</a></li>
        <li class="tab"><a href="/">Test 3</a></li>
        <li class="tab"><a href="about-us">About Us</a></li>
      </ul>
    </div>
  </nav>
  );
}


class App extends React.Component {
  render() {
    return (
        <Router>
          <Sidebar/>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/" component={PostsListPage} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
