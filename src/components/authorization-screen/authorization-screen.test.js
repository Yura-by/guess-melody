import AuthorizationScreen from './authorization-screen.jsx';
import React from 'react';
import renderer from 'react-test-renderer';

it(`AuthorizationScreen snapshot test`, () => {
  const tree = renderer
    .create(<AuthorizationScreen
      isBadLoginData={false}
      email={``}
      password={``}
      formSubmitHandler={() => {}}
      loginChangeHandler={() => {}}
      passwordChangeHandler={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
