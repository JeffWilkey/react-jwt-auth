import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import '../assets/stylesheets/header-bar.css';
import logo from '../assets/images/logo.png';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <p className='logout-wrapper'>
                  {'('}<a className='logout' onClick={() => this.logOut()}>logout</a>{')'}
                </p>
            );
        }
        const { currentUser } = this.props;

        return (
            <div className="header-bar">
              <div className="header-bar-logo-container" onClick={() => this.props.history.push('/dashboard')}>
                <img className="header-bar-logo" src={logo} alt="World of Warcraft Logo"/>
                <h1 className="header-bar-logo-text">Progress</h1>
              </div>
              <div className="header-bar-user-container">
                { this.props.loggedIn ?
                  <img className="header-bar-user-avatar" src={currentUser ? currentUser.gravatar : logo}/>
                  :
                  null
                }
                <p className="header-bar-user-name">{currentUser ? currentUser.username : ''}</p>
                {logOutButton}
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(HeaderBar));
