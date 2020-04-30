import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const mock = {
  settings: {
    gameTime: 0,
    errorCount: 0
  },
  questions: [{}]
};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      gameData={mock}
    />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
