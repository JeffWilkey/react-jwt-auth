import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  shallow(
    <Router>
      <App />
    </Router>
  )
});
