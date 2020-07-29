import React from 'react';
import FailTime from './fail-time.jsx';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history.js';

it(`Snapshot test for FailTime`, () => {
  const tree = renderer
    .create(<Router history={history}>
      <FailTime
        onUserClick={() => {}}
      />
    </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
