import React from 'react';
import Mistakes from './mistakes.jsx';
import renderer from 'react-test-renderer';

it(`Snapshot test for Mistakes`, () => {
  const tree = renderer
    .create(<Mistakes
      mistakes={2}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
