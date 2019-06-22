import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/home_page/HomePage';
import JobListingDetailed from './components/pages/job_listing_detailed_page/JobListingDetailed';
import CreateJobListing from './components/pages/create_job_listing_page/CreateJobListing';
import Profile from './components/pages/profile_page/Profile';
import Login from './components/pages/login_page/Login';
import Register from './components/pages/register_page/Register';
import './App.css';

/* Import React Router */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Import for dummy data */
import { listings as jobs } from './data/listings';
import { users } from './data/users';


class App extends Component {

  state = {
    loggedIn: false
  }

 
  render() {

    const homePage = () =>
        <div>
        <HomePage jobs={jobs}/>
        </div>
        ;

    const listingPage = () =>
      <div>
      <JobListingDetailed listing={ jobs[0] } />
      </div>
      ;
      
    const createJobListingPage =() =>
      <div>
      <CreateJobListing />
      </div>
      ;

    const profilePage = () =>
      <div>
      <Profile user={ users[0] }/>
      </div>

    const loginPage = () =>
      <div>
      <Login />
      </div>

    const registerPage = () =>
      <div>
      <Register />
      </div>

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={homePage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/job" component={listingPage}/>
          <Route exact path="/profile" component={profilePage}/>
        </div>
      </Router>
      );
  }
}


export default App;
