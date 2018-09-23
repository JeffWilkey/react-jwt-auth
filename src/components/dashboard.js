import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import requiresLogin from './requires-login';
import {fetchCharacters} from '../actions/characters';
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

    render() {
      const { characters } = this.props;
      const renderCharacters = characters.map((character) => (
        <CharacterRow character={character}/>
      ));
      let error
      console.log('error', this.props.error)
      if (this.props.error) {
        error = (
          <div className="error-toast">
            {this.props.error.reason}
          </div>
        )
      }
      return (
          <div className="dashboard">
            {error}
            <CharacterForm onSubmit={this.handleSubmit}/>
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
        error: state.characters.error
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
