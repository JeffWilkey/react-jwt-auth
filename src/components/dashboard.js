import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import requiresLogin from './requires-login';
import {fetchCharacters} from '../actions/characters';
import CharacterForm from './character-form';
import '../assets/stylesheets/dashboard.css';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchCharacters());
    }

    render() {
      const renderCharacters = this.props.characters.map(({name, realm}) => (
        <p>{name} - {realm}</p>
      ));

      return (
          <div className="dashboard">
            <CharacterForm/>
            <div className="dashboard-protected-data">
                {renderCharacters}
            </div>
          </div>
      );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        characters: state.characters.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
