import React from 'react';
import renderer from 'react-test-renderer';
import GameScreen from './game-screen.jsx';
import configureStore from 'redux-mock-store';
import questions from '../../mocks/questions.js';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

it(`GameScreen snapshot test`, () => {
  const store = mockStore({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
    gameTime: 100,
    currentTime: 0,
    questions,
    timerId: -1
  });

  const tree = renderer
    .create(<Provider store={store}>
      <GameScreen type={`genre`}>
        <div></div>
      </GameScreen>
    </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
