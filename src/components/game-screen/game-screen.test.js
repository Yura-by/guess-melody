import React from 'react';
import renderer from 'react-test-renderer';
import GameScreen from './game-screen.jsx';

it(`GameScreen snapshot test`, () => {
  const tree = renderer
    .create(<GameScreen
      type={`genre`}
    >
      <div>`Hello`</div>)
    </GameScreen>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
