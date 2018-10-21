import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import CharacterRow from '../components/character-row';
import {fetchClasses} from '../actions/character-classes';
import {fetchRaces} from '../actions/character-races';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CharacterRow/>', () => {
  it('Renders without crashing', () => {
    const initialState = {};
    const store = mockStore(initialState);
    shallow(
      <Provider store={store}>
        <CharacterRow/>
      </Provider>
    )
  })
  it('Should dispatch fetchClasses', () => {
    const store = mockStore({})

    return store.dispatch(fetchClasses())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual('FETCH_CLASSES_SUCCESS')
      })
  });

  it('Should dispatch fetchRaces', () => {
    const store = mockStore({})

    return store.dispatch(fetchRaces())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual('FETCH_RACES_SUCCESS')
      })
  });
})
