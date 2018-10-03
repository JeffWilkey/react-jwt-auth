import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';
import Hero from '../assets/images/hero-image.png';
import '../assets/stylesheets/landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
      if (props.loggedIn) {
          return <Redirect to="/dashboard" />;
      }

      return (
        <div className="container">
          <div className="home">
            <div className="auth-splash">
              <div className="auth-splash-left">
                <h2>Login</h2>
                <LoginForm />
              </div>
              <div className="auth-splash-right">
                <h2>Register</h2>
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      );

}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
