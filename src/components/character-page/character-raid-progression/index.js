import React, {Component} from 'react';
import Select from 'react-select';
import CharacterBossProgression from './character-boss-progression';
import '../../../assets/stylesheets/character-raid-progression.css';

class CharacterRaidProgression extends Component {
  render() {
    const { progression, selectedRaid, raidSelectOptions } = this.props;
    return (
      <div className="character-raid-progression">
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
        <CharacterBossProgression progression={progression} selectedRaid={selectedRaid} />
      </div>
    )
  }
}

export default CharacterRaidProgression;
