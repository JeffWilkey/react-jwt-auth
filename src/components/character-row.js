import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { fetchClasses } from '../actions/character-classes';
import { fetchRaces } from '../actions/character-races';
import { getClassColor } from '../utils/getClassColor';
import '../assets/stylesheets/character-row.css';

class CharacterRow extends Component {

  componentWillMount() {
    this.props.dispatch(fetchClasses());
    this.props.dispatch(fetchRaces());
  }

  getClassName = () => {
    const { classes, character } = this.props;
    return _.find(classes, ['id', character.class]).name;
  }

  getRaceName = () => {
    const { races, character } = this.props;
    return _.find(races, ['id', character.race]).name;
  }

  render() {
    const { character, classes, races, history } = this.props;
    const characterClassName = classes.length ? this.getClassName() : 'Loading...';
    const characterClassColor = getClassColor(characterClassName);
    const characterRaceName = races.length ? this.getRaceName() : 'Loading...';
    return (
      <div style={{ borderColor: characterClassColor, color: characterClassColor}} className="character-row" onClick={() => this.props.history.push(`/characters/${character.realmSlug}/${character.name}`)}>
        <p className="character-name column">{character.name}</p>
        <p className="character-race column">
          {races.length ? characterRaceName : 'Loading...'}
        </p>
        <p className="character-class column">
          {characterClassName}
        </p>
        <p className="character-realm column">{character.realm}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes.data,
    races: state.races.data
  }
};

export default withRouter(connect(mapStateToProps)(CharacterRow));
