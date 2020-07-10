import React from 'react';
import {App} from './app.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it(`App calls render function`, () => {
  const mockFunc = jest.fn();

  shallow(<App
    renderScreen={mockFunc}
    step={1500}
    isBadLoginData={false}
    isRequireAuthorization={false}
  />);

  expect(mockFunc).toHaveBeenCalledTimes(1);
  expect(mockFunc).toHaveBeenNthCalledWith(1, 1500);
});
