import React from 'react';
import withScreenSwitch, {withScreenSwitch as pureWithScreenSwitch} from './with-screen-switch';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import PropTypes from 'prop-types';

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      id: 5,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      id: 6,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      id: 7,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      id: 8,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      id: 9,
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      id: 10,
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `John Snow`,
    }, {
      id: 11,
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Jack Daniels`,
    }, {
      id: 12,
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Jim Beam`,
    }],
  },
];

const mockStore = configureStore([]);

const MockComponent = (props) => {
  return <div>{props.renderScreen()}</div>;
};

MockComponent.propTypes = {
  renderScreen: PropTypes.func.isRequired
};

const WithScreenSwitch = withScreenSwitch(MockComponent);
const PureWitnScreenSwitch = pureWithScreenSwitch(MockComponent);

it(`WelcomeScreen renders correctly`, () => {
  const store = mockStore({});

  const tree = renderer
    .create(<Provider store={store}>
      <PureWitnScreenSwitch
        gameTime={120}
        maxMistakes={3}
        step={-1}
        mistakes={0}
        onWelcomeScreenClick={() => {}}
        onUserAnswer={() => {}}
        questions={questions}
        onUserResetGame={() => {}}
        timerId={6}
        isRequireAuthorization={false}
        onUserLogin={() => {}}
        isBadLoginData={false}
        currentTime={15}
      />
    </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`GenreQuestion renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {questions},
    [NameSpace.USER]: {
      isRequireAuthorization: true,
      userData: {},
      isBadLoginData: false
    },
    [NameSpace.GAME]: {
      step: 0,
      mistakes: 5,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 16,
      timerId: -1,
    }
  });

  const tree = renderer
    .create(<Provider store={store}>
      <PureWitnScreenSwitch
        gameTime={120}
        maxMistakes={3}
        step={0}
        mistakes={0}
        onWelcomeScreenClick={() => {}}
        onUserAnswer={() => {}}
        questions={questions}
        onUserResetGame={() => {}}
        timerId={6}
        isRequireAuthorization={false}
        onUserLogin={() => {}}
        isBadLoginData={false}
        currentTime={15}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`ArtistQuestion renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {questions},
    [NameSpace.USER]: {
      isRequireAuthorization: true,
      userData: {},
      isBadLoginData: false
    },
    [NameSpace.GAME]: {
      step: 1,
      mistakes: 5,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 16,
      timerId: -1,
    }
  });

  const tree = renderer
    .create(<Provider store={store}>
      <PureWitnScreenSwitch
        gameTime={120}
        maxMistakes={3}
        step={1}
        mistakes={0}
        onWelcomeScreenClick={() => {}}
        onUserAnswer={() => {}}
        questions={questions}
        onUserResetGame={() => {}}
        timerId={6}
        isRequireAuthorization={false}
        onUserLogin={() => {}}
        isBadLoginData={false}
        currentTime={15}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`AuthorizationScreenWrapped renders correctly`, () => {
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
      <WithScreenSwitch />
    </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
