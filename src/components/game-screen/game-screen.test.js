import React from 'react';
import renderer from 'react-test-renderer';
import GameScreen from './game-screen.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';
import questions from '../../mocks/questions.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);

it(`GameScreen snapshot test`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {questions},
    [NameSpace.USER]: {
      isRequireAuthorization: true,
      userData: {},
      isBadLoginData: false
    },
    [NameSpace.GAME]: {
      step: 2,
      mistakes: 5,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 16,
      timerId: -1,
    }
  });

  const tree = renderer
    .create(<Provider store={store}>
      <Router history={history}>
        <GameScreen type={`genre`}>
          <div></div>
        </GameScreen>
      </Router>
    </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
