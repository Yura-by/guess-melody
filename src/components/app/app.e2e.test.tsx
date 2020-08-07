import * as React from 'react';
import App from './app';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

it(`App calls render function`, () => {
  const mockFunc = jest.fn();

  shallow(<App
    renderScreen={mockFunc}
  />);

  expect(mockFunc).toHaveBeenCalledTimes(1);
});
