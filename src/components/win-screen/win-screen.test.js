import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import WinScreen from './win-screen.jsx';
import history from '../../history.js';

it(`WinScreen snapshot test`, () => {
  const tree = renderer.create(<Router history={history}>
    <WinScreen
      gameTime={12}
      currentTime={9}
      mistakes={3}
      onResetGame={jest.fn()}
    />
  </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
