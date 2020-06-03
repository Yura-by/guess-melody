import React from 'react';
import FailTime from './fail-time.jsx';
import renderer from 'react-test-renderer';

it(`Snapshot test for FailTime`, () => {
  const tree = renderer
    .create(<FailTime
      onUserClick={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
