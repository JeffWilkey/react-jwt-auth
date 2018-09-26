import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import {RingLoader} from 'react-spinners';
import Script from 'react-load-script';
import { getIlvlColor } from '../utils/getIlvlColor';
import CharacterGearPiece from './character-gear-piece';
import '../assets/stylesheets/character-gear.css';

const override = css`
    display: block;
    margin: 0 auto;
`;

class CharacterGear extends Component {
  state = {
    tooltipScriptLoaded: false
  }
  handleScriptLoad = () => {
    this.setState({ tooltipScriptLoaded: true })
  }
  render() {
    const {
      averageItemLevelEquipped,
      head,
      neck,
      shoulder,
      back,
      chest,
      wrist,
      hands,
      waist,
      legs,
      feet,
      finger1,
      finger2,
      trinket1,
      trinket2,
      mainHand,
      offHand
    } = this.props.items;

    const renderGear = [
    head,
    neck,
    shoulder,
    back,
    chest,
    wrist,
    hands,
    waist,
    legs,
    feet,
    finger1,
    finger2,
    trinket1,
    trinket2,
    mainHand,
    offHand].map((item) => {
      if (item) {
        return (
          <CharacterGearPiece item={item} character={this.props.character}/>
        )
      }
    })
    console.log('items', this.props.items)
    if (this.props.items) {
      return (
        <div className="character-gear">
          <Script
            url="https://wow.zamimg.com/widgets/power.js"
            onLoad={this.handleScriptLoad}
          />
          <div className="character-gear-header">
            <h1>Gear</h1>
            <div className="character-ilvl-wrapper" style={getIlvlColor(averageItemLevelEquipped)}>
              <h2>ilvl: {averageItemLevelEquipped}</h2>
            </div>
          </div>
          {!this.state.tooltipScriptLoaded && this.props.items?
            <RingLoader
              className={override}
              sizeUnit={"px"}
              size={60}
              color={'#EDCA19'}
              loading={true}
            />
            :
            <div>
              {renderGear}
            </div>

          }
        </div>
      )
    }
  }
}

export default connect(null)(CharacterGear);
