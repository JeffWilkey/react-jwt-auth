import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import RegistrationPage from '../components/registration-page';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<RegistrationPage/>', () => {
  it('Renders without crashing', () => {
    const initialState = {};
    const store = mockStore(initialState);
    shallow(
      <Provider store={store}>
        <RegistrationPage/>
      </Provider>
    )
  })
})
