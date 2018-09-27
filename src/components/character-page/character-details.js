import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {fetchClasses} from '../../actions/character-classes';
import {getClassColor} from '../../utils/getClassColor';

const factionColors = ['#40aded', '#BA1A38']

class CharacterDetails extends Component {
  componentWillMount() {
    this.props.dispatch(fetchClasses());
  }

  getClassName = () => {
    const { classes, character } = this.props;
    return _.find(classes, ['id', character.class]).name;
  }

  getSpecName = () => {
    const { talents } = this.props.character;
    return _.find(talents, ['selected', true]).spec.name;
  }

  render() {
    const { character, classes } = this.props;
    const { name, realm, guild, race, thumbnail, talents, faction } = character;
    const characterClassName = character.class && classes && classes.length ? this.getClassName() : 'Loading...';
    const characterClassSpec = talents && talents.length ? this.getSpecName() : 'Loading...';
    const characterClassColor = getClassColor(characterClassName);
    return (
      <div className="character-details">
        <img className="character-image" src={`http://render-us.worldofwarcraft.com/character/${thumbnail}`}/>
        <div className="character-datatext">
          <h1 className="name">{name}</h1>
          <div className="character-datatext-wrap">
            {
              guild ? <h3 className="guild" style={{ color: factionColors[faction] }}>{guild.name}</h3> : ''
            }

            <h4 className="realm">on US - {realm}</h4>
          </div>
          <h4 className="class-spec" style={{ color: characterClassColor }}>
            {characterClassSpec} {characterClassName}
          </h4>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes.data
  }
}

export default connect(mapStateToProps)(CharacterDetails);
