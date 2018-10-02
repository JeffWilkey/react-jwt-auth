import React, {Component} from 'react';
import _ from 'lodash';
import { getBossIconUrl } from '../../../utils/getBossIconUrl';


class CharacterBossProgression extends Component {
  getColor = (boss) => {
    if (boss.mythicTimestamp) {
      return '#ff8000'
    } else if (boss.heroicTimestamp) {
      return '#a335ee'
    } else if (boss.normalTimestamp) {
      return '#0070dd'
    } else {
      return '#666'
    }
  }
  render() {
    const {progression, selectedRaid} = this.props;
    const selectedRaidFromProgression = _.find(progression.raids, ['name', selectedRaid.label])

    const renderBossRows = selectedRaidFromProgression.bosses.map((boss) => (
      <div className="boss-row" key={boss.id}>
        { getBossIconUrl(boss.name) ?
          <img className="boss-field boss-icon" src={getBossIconUrl(boss.name)}/>
          :
          null
        }

        <p className="boss-field boss-name" style={{ color: this.getColor(boss) }}>{boss.name}</p>
        <p className="boss-field boss-normal-kills" style={!boss.normalKills ? { color: '#666' } : null}>{boss.normalKills}</p>
        <p className="boss-field boss-heroic-kills" style={!boss.heroicKills ? { color: '#666' } : null}>{boss.heroicKills}</p>
        <p className="boss-field boss-mythic-kills" style={!boss.mythicKills ? { color: '#666' } : null}>{boss.mythicKills}</p>
      </div>
    ))
    return (
      <div className="character-boss-progression">
        <div className="boss-row">
          <p className="boss-field boss-name header">Name</p>
          <p className="boss-field boss-normal-kills header">Kills (N)</p>
          <p className="boss-field boss-heroic-kills header">Kills (H)</p>
          <p className="boss-field boss-mythic-kills header">Kills (M)</p>
        </div>
        {renderBossRows}
      </div>
    )
  }
}

export default CharacterBossProgression;
