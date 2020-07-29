import React from 'react';
import renderer from 'react-test-renderer';
import GameOver from './game-over.jsx';
import {Router} from 'react-router-dom';
import history from '../../history.js';

it(`GameOver snapshot test`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <GameOver
          onResetGame={jest.fn()}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
