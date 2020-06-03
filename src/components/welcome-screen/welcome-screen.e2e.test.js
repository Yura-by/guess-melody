import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Welcome button should pressed`, () => {
  const onButtonClick = jest.fn();
  const tree = shallow(<WelcomeScreen
    time={80}
    errorCount={6}
    onStartButtonClick={onButtonClick}
  />);

  const welcomeButton = tree.find(`button.welcome__button`);

  welcomeButton.props().onClick();
  expect(onButtonClick.mock.calls.length).toBe(1);
});
