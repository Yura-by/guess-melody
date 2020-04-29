import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

it(`WelcomeScreen snapshot test`, () => {
  const welcomScreenTree = renderer
    .create(<WelcomeScreen
      time={0}
      errorCount={0}
      onStartButtonClick={() => {}}
    />
    ).toJSON();

  expect(welcomScreenTree).toMatchSnapshot();
});
