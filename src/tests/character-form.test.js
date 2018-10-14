import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import CharacterForm from '../components/character-form';
import {fetchRealms} from '../actions/realms';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CharacterForm/>', () => {
  it('Renders without crashing', () => {
    const initialState = {}
    const store = mockStore(initialState);
    shallow(
      <Provider store={store}>
        <CharacterForm/>
      </Provider>
    );
  });

  it('Should dispatch fetchRealms', () => {
    const store = mockStore({})
    return store.dispatch(fetchRealms())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual('FETCH_REALMS_SUCCESS');
      });
  });

  it('Renders the character-input/character-realm-input fields and button initially', async () => {
    const tempStore = mockStore({});
    const realmList = await tempStore.dispatch(fetchRealms());
    const store = mockStore({
      realms: realmList.data
    })
    const wrapper = mount(
      <Provider store={store}>
        <CharacterForm/>
      </Provider>
    )
    expect(wrapper.find('.form-submit').exists()).toEqual(true);
    expect(wrapper.find('.character-input').exists()).toEqual(true);
    expect(wrapper.find('.character-realm-input').exists()).toEqual(true);
  });

});
