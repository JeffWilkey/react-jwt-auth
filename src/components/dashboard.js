import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import requiresLogin from './requires-login';
import {fetchCharacters, deleteCharacter} from '../actions/characters';
import CharacterForm from './character-form';
import CharacterRow from './character-row';
import '../assets/stylesheets/dashboard.css';


export class Dashboard extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchCharacters());
    }

    handleSubmit = () => {
      this.props.dispatch(fetchCharacters());
    }

    handleDelete = (characterId) => {
      this.props.dispatch(deleteCharacter(characterId));
    }

    render() {
      const { characters } = this.props;
      const renderCharacters = characters.map((character) => (
        <CharacterRow character={character} handleDelete={this.handleDelete}/>
      ));
      let error
      if (this.props.addCharacterError) {
        error = (
          <div className="error-toast">
            {this.props.addCharacterError.reason}
          </div>
        )
      }
      return (
          <div className="dashboard">
            {error}
            <CharacterForm onSubmit={this.handleSubmit}/>
            <div className="dashboard-character-table-header">
              <p className="column">Name</p>
              <p className="column">Race</p>
              <p className="column">Class</p>
              <p className="column">Realm</p>
            </div>
            {characters.length ? renderCharacters : <p className="none-header">No Tracked Characters</p>}
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
        characters: state.characters.data,
        error: state.characters.error,
        addCharacterError: state.characters.addCharacterError
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
