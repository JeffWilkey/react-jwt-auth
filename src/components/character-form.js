import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Select from 'react-select';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import {fetchRealms} from '../actions/realms';
import {addCharacter} from '../actions/characters';
import '../assets/stylesheets/character-form.css';

class CharacterForm extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRealms());
  }

  onSubmit = async (values) => {
    await this.props.dispatch(addCharacter(values))
    this.props.onSubmit();
  }
  render() {
    const { realms } = this.props;

    return (
      <form
        className="character-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <div className="character-name">
          <label htmlFor="name" className="character-label">Name</label>
          <Field
            className="character-input"
            component={Input}
            type="text"
            name="name"
            placeholder="Character Name"
          />
        </div>
        <div className="character-realm">
          <label htmlFor="realm" className="character-label">Realm</label>
          <Field name='realm'
            component={props =>
              <Select
                className="character-realm-input"
                value={props.input.value}
                onChange={props.input.onChange}
                onBlur={() => props.input.onBlur(props.input.value)}
                options={realms ? realms.map(realm => ({label: realm.name, value: realm.slug})) : []}
                placeholder="Select Realm"
                simpleValue
              />
            }
          />
        </div>
        <button className="form-submit">
          Add Character
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    realms: state.realms.data
  }
}

CharacterForm = connect(
  mapStateToProps
)(CharacterForm);

export default reduxForm({
  form: 'character',
  onSubmitFail: (errors, dispatch) => dispatch(focus('name', 'realm'))
})(CharacterForm);
