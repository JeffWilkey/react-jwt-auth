import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { fetchClasses } from '../actions/character-classes';
import { fetchRaces } from '../actions/character-races';
import '../assets/stylesheets/character-row.css';

class CharacterRow extends Component {

  componentWillMount() {
    this.props.dispatch(fetchClasses());
    this.props.dispatch(fetchRaces());
  }

  getClassColor = (className) => {
    switch (className) {
      case 'Death Knight':
        return '#C41F3B'
      case 'Demon Hunter':
        return '#A330C9'
      case 'Druid':
        return '#FF7D0A'
      case 'Hunter':
        return '#ABD473'
      case 'Mage':
        return '#40C7EB'
      case 'Monk':
        return '#00FF96'
      case 'Paladin':
        return '#F58CBA'
      case 'Priest':
        return '#FFFFFF'
      case 'Rogue':
        return '#FFF569'
      case 'Shaman':
        return '#0070DE'
      case 'Warlock':
        return '#8787ED'
      case 'Warrior':
        return '#C79C6E'
    }
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
    const { character, classes, races } = this.props;
    const characterClassName = classes.length ? this.getClassName() : 'Loading...';
    const characterClassColor = this.getClassColor(characterClassName);
    const characterRaceName = races.length ? this.getRaceName() : 'Loading...';

    return (
      <div style={{ 'border-color': characterClassColor, color: characterClassColor}} className="character-row">
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

export default connect(mapStateToProps)(CharacterRow);
