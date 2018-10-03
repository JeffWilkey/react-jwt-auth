import React, {Component} from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { ProgressBar } from 'react-bootstrap';
import CharacterBossProgression from './character-boss-progression';
import '../../../assets/stylesheets/character-raid-progression.css';
import '../../../assets/stylesheets/bootstrap-theme.min.css';
import '../../../assets/stylesheets/bootstrap.min.css';

class CharacterRaidProgression extends Component {
  killCount = (difficulty) => {
    const { bossCount, selectedRaid, progression } = this.props;
    const { raids } = progression;
    let killCount = 0;
    _.find(raids, ['name', selectedRaid.value]).bosses.forEach(boss => {
      if (boss[`${difficulty}Kills`] > 0) {
        killCount += 1;
      } else if (boss[`${difficulty}Kills`] === undefined) {
        killCount = 0;
      }
    })
    return killCount;
  }
  render() {
    const { progression, selectedRaid, raidSelectOptions, bossCount } = this.props;
    console.log(`Normal ${this.killCount('normal')}/${bossCount}`)
    console.log(this.killCount('heroic')/bossCount * 100)
    console.log(this.killCount('mythic')/bossCount * 100)
    return (
      <div>
        {
          progression && progression.raids ?
          <div className="raid-select-wrapper progression">
            <Select
              className="raid-select"
              classNamePrefix="select"
              value={selectedRaid}
              isDisabled={false}
              isClearable={false}
              isSearchable={true}
              onChange={(e) => this.props.handleRaidSelect(e)}
              name="raid"
              options={raidSelectOptions}
            />
          </div>
          :
          ''
        }
        <div className="character-raid-progression">
          <ProgressBar>
            { this.killCount('mythic') ?
              <ProgressBar bsStyle="mythic" label={`Mythic ${this.killCount('mythic')}/${bossCount}`} key={1} now={(this.killCount('mythic')/bossCount * 100)} />
              :
              null
            }
            {
              this.killCount('heroic') ?
              <ProgressBar bsStyle="heroic" label={`Heroic ${this.killCount('heroic')}/${bossCount}`} key={2} now={(this.killCount('heroic')/bossCount * 100) - (this.killCount('mythic')/bossCount * 100)} />
              :
              null
            }

            <ProgressBar bsStyle="normal" label={`Normal ${this.killCount('normal')}/${bossCount}`} key={3} now={this.killCount('normal') ? (this.killCount('normal')/bossCount * 100) - (this.killCount('heroic')/bossCount * 100) - (this.killCount('mythic')/bossCount * 100) : 8}/>
          </ProgressBar>
          <CharacterBossProgression progression={progression} selectedRaid={selectedRaid} />
        </div>
      </div>

    )
  }
}

export default CharacterRaidProgression;
