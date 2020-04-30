import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import GameArtist from './game-artist';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  type: `artist`,
  song: {
    artist: `Mikle Jackson`,
    src: `path`,
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
};

it(`On change gets called with the right arguments`, () => {
  const onFormChange = jest.fn();
  const tree = shallow(<GameArtist
    question={mock}
    onAnswer={onFormChange}
    questionNumber={0}
  />);

  const formElement = tree.find(`.game__artist`);
  formElement.simulate(`change`, {target: {value: `artist-1`}});

  expect(onFormChange).toHaveBeenCalledTimes(1);

  expect(onFormChange).toHaveBeenCalledWith(expect.objectContaining({
    type: expect.any(String),
    song: expect.objectContaining({
      artist: expect.any(String),
      src: expect.any(String)
    }),
    answers: expect.any(Array)
  }),
  expect.objectContaining({
    picture: expect.any(String),
    artist: expect.any(String),
  }));
});
