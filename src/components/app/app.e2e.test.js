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
      answers: [
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `rock`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `blues`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `jazz`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `rock`,
        },
      ],
    }, {
      type: `artist`,
      song: {
        artist: `Mikle Jackson`,
        src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      },
      answers: [
        {
          picture: `https://via.placeholder.com/134x134`,
          artist: `Mikle Jackson`,
        },
        {
          picture: `https://via.placeholder.com/134x134`,
          artist: `Selena Gomez`,
        },
        {
          picture: `https://via.placeholder.com/134x134`,
          artist: `50 cent`,
        },
      ],
    },
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
