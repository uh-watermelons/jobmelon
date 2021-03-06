import React, { Component } from 'react';
import HomePage from './pages/home_page/HomePage';
import JobListingDetailed from './pages/job_listing_detailed_page/JobListingDetailed';
import CreateJobListing from './pages/create_job_listing_page/CreateJobListing';
import Profile from './pages/profile_page/Profile';
import Register from './pages/register_page/Register';
import Login from './pages/login_page/Login';
import EditUser from './pages/edit_user_page/EditUser';
import ContactUs from './pages/contact_us/ContactUs';
import TermsOfUse from './pages/terms_of_use/TermsOfUse';
import PrivacyPolicy from './pages/privacy_policy/PrivacyPolicy';

import { Provider } from 'react-redux';
import store from '../store';

import './App.css';

/* Import React Router */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* The wrapper component for protecting routes */
import PrivateRoute from "./pages/private_route/PrivateRoute";

/* Used for having the user stay logged in even when refreshing */
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/job/:listingId" component={JobListingDetailed}/>
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/createjob" component={CreateJobListing} />
            <PrivateRoute exact path="/edit" component={EditUser} />
          </Switch>
          <Route exact path="/contactus" component={ContactUs}/>
          <Route exact path="/terms" component={TermsOfUse}/>
          <Route exact path="/privacy" component={PrivacyPolicy}/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
