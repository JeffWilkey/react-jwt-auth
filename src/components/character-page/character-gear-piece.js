import React, {Component} from 'react';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { getQualityColor } from '../../utils/getQualityColor';
import '../../assets/stylesheets/character-gear-piece.css';

class CharacterGearPiece extends Component {
  constructWowheadData = () => {
    const { character, item } = this.props
    const { id, tooltipParams, azeriteEmpoweredItem, itemLevel } = item;

    let wowheadData = `item=${id}&ilvl=${itemLevel}`;
    if (tooltipParams.transmogItem) {
      wowheadData = wowheadData.concat(`&transmog=${tooltipParams.transmogItem}`)
    }
    if (tooltipParams.enchant) {
      wowheadData = wowheadData.concat(`&ench=${tooltipParams.enchant}`)
    }

    if (azeriteEmpoweredItem.azeritePowers.length) {
      const tier0 = _.find(azeriteEmpoweredItem.azeritePowers, ['tier', 0]).id;
      const tier1 = _.find(azeriteEmpoweredItem.azeritePowers, ['tier', 1]).id;
      const tier2 = _.find(azeriteEmpoweredItem.azeritePowers, ['tier', 2]).id;
      const tier3 = _.find(azeriteEmpoweredItem.azeritePowers, ['tier', 3]).id;

      wowheadData = wowheadData.concat(`&azerite-powers=${character.class}:${tier3}:${tier2}:${tier1}:${tier0}`)
    }


    return wowheadData
  }

  render() {
    const { id, name, quality, itemLevel, icon } = this.props.item;
    return (

      <div style={{ display: 'inline-block' }}>
        <div className="character-gear-piece" style={{ borderColor: getQualityColor(quality)}}>
          <a href={`http://www.wowhead.com/item=${id}`} target="_blank" className="wowhead-link" data-wh-rename-link="true" data-wowhead={this.constructWowheadData()}>
            <span className="iconmedium">
              <ins style={{ backgroundImage: `url(${`https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`})`}}></ins>
            </span>
          </a>
        </div>
        <div
          className="character-gear-piece-ilvl"
          style={quality !== 6 && quality !== 2 ?
            { backgroundColor: getQualityColor(quality) }
            :
            { backgroundColor: getQualityColor(quality), color: '#000' }
          }>
          <p>{itemLevel}</p>
        </div>
      </div>
    )
  }
}

export default CharacterGearPiece;
