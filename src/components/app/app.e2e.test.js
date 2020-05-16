import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app';

const mock = {
  settings: {
    gameTime: 0,
    errorCount: 0
  },
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [{
        id: 1,
        src: `path`,
        genre: `rock`,
      }]
    },
    {
      type: `artist`,
      song: {
        artist: `name`,
        src: `path`,
      },
      answers: [
        {
          id: 2,
          picture: `path`,
          artist: `name`,
        }
      ]
    }
  ]
};

Enzyme.configure({adapter: new Adapter()});

it(`App click on welcome button`, () => {

  const app = mount(<App
    gameData={mock}
  />);

  expect(app.state(`question`)).toEqual(-1);

  const startButton = app.find(`.welcome__button`);
  startButton.simulate(`click`);
  app.update();

  expect(app.state(`question`)).toEqual(0);
});
