import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import CharacterDetails from '../components/character-page/character-details';
import {fetchClasses} from '../actions/character-classes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CharacterDetails/>', () => {
  it('Renders without crashing', () => {
    const initialState = {}
    const store = mockStore(initialState);
    shallow(
      <Provider store={store}>
        <CharacterDetails/>
      </Provider>
    );
  });

  it('Should dispatch fetchClasses', () => {
    const store = mockStore({})

    return store.dispatch(fetchClasses())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual('FETCH_CLASSES_SUCCESS')
      })
  });
});
