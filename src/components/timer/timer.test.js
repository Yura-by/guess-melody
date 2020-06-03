import React from 'react';
import renderer from 'react-test-renderer';
import {Timer} from './timer.jsx';

it(`Snapshot test for Timer`, () => {
  const tree = renderer
    .create(<Timer
      currentTime={60}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
