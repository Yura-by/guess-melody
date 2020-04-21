import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app';

Enzyme.configure({adapter: new Adapter()});

it(`App click on welcome button`, () => {
  const clickHandler = jest.fn();

  const app = shallow(<App
    errorCount={0}
    gameTime={0}
    onClick={clickHandler}
  />);

  const startButton = app.find(`button`);

  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
