import React, {Component} from 'react';
import { css } from 'react-emotion';
import {connect} from 'react-redux';
import _ from 'lodash';
import {RingLoader} from 'react-spinners';
import Select from 'react-select';
import {fetchCharacterDetail} from '../../actions/character-detail';
import CharacterDetails from './character-details';
import CharacterGear from './character-gear';
import CharacterRaidProgression from './character-raid-progression/index';
import TabSelector from '../tab-selector';
import '../../assets/stylesheets/character-page.css';

const override = css`
    display: block;
    margin: 0 auto;
`;

class CharacterPage extends Component {
  state = {
    loading: !this.props.character.length,
    selectedRaid: { // default selected raid
      label: 'Uldir',
      value: 'Uldir'
    },
    bossCount: 8, // boss count of default selected raid
    selectedTab: 'raid_progression' // default selected tab for tab selector
  }
  componentWillMount() {
    this.setState({ loading: true })
  }
  componentDidMount() {
    const { name, realm } = this.props.match.params;
    this.props.dispatch(fetchCharacterDetail(name, realm));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.character !== [] && this.state.loading === true) {
      this.setState({ loading: false });
    }
  }

  raidOptions = () => {
    const { raids } = this.props.character.progression;
    return raids.map(raid => ({ label: raid.name, value: raid.name }))
  }

  raidProgression = (difficulty) => {
    const { raids } = this.props.character.progression;
    const { selectedRaid, bossCount } = this.state;
    let killCount = 0;
    _.find(raids, ['name', selectedRaid.value]).bosses.forEach(boss => {
      if (boss[`${difficulty}Kills`] > 0) {
        killCount += 1;
      } else if (boss[`${difficulty}Kills`] === undefined) {
        killCount = null;
      }
    })
    return killCount !== null ? `${killCount} / ${bossCount}` : 'N/A';
  }


  handleChange = (e) => {
    const { raids } = this.props.character.progression;
    const bossCount = _.find(raids, ['name', e.value]).bosses.length;
    this.setState({
      selectedRaid: e,
      bossCount
    })
  }

  render() {
    const { loading, selectedRaid, selectedTab } = this.state;
    const { progression, items } = this.props.character;
    return (
      <div className="character-page">

          { loading ?
            <RingLoader
              className={override}
              sizeUnit={"px"}
              size={60}
              color={'#EDCA19'}
              loading={loading}
            />
            :
            <div className="container">

                {
                  progression && progression.raids ?
                  <div className="raid-select-wrapper">
                    <Select
                      className="raid-select"
                      classNamePrefix="select"
                      value={selectedRaid}
                      isDisabled={false}
                      isClearable={false}
                      isSearchable={true}
                      onChange={(e) => this.handleChange(e)}
                      name="raid"
                      options={this.raidOptions()}
                    />
                  </div>
                  :
                  ''
                }
              <div className="character-main">
                <CharacterDetails character={this.props.character}/>
                <div className="character-progression">
                  <div className="raid-top raid-normal">
                    <h2>{progression ? this.raidProgression('normal') : 'Loading...'}</h2>
                    <h2>N</h2>
                  </div>
                  <div className="raid-top raid-heroic">
                    <h2>{progression ? this.raidProgression('heroic') : 'Loading...'}</h2>
                    <h2>H</h2>
                  </div>
                  <div className="raid-top raid-mythic">
                    <h2>{progression ? this.raidProgression('mythic') : 'Loading...'}</h2>
                    <h2>M</h2>
                  </div>
                </div>
              </div>
              <div className="character-main-2">
                <CharacterGear items={items} character={this.props.character}/>
              </div>
              <div className="character-main-3">
                <div className="character-main-3-header">
                  <TabSelector
                    tabs={[
                      { label: 'Raid/Progression', value: 'raid_progression' },
                      { label: 'Mythic+', value: 'mythic_plus' },
                      { label: 'PVE Tools', value: 'pve_tools' }
                    ]}
                    handleSelect={(selectedTab) => this.setState({selectedTab})}
                    selectedTab={this.state.selectedTab}
                  />
                </div>
                { selectedTab === 'raid_progression' ?
                  <CharacterRaidProgression
                    selectedRaid={selectedRaid}
                    progression={progression}
                    raidSelectOptions={this.raidOptions()}
                    handleRaidSelect={(selectedRaid) => this.setState({selectedRaid})}
                  />
                  :
                  null
                }

              </div>
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    character: state.character.data
  }
}

export default connect(mapStateToProps)(CharacterPage);
