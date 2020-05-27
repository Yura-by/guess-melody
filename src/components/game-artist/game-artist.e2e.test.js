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
      id: 1,
      picture: `https://via.placeholder.com/134x134`,
      artist: `Mikle Jackson`,
    },
    {
      id: 2,
      picture: `https://via.placeholder.com/134x134`,
      artist: `Selena Gomez`,
    },
    {
      id: 3,
      picture: `https://via.placeholder.com/134x134`,
      artist: `50 cent`,
    },
  ],
};

const mockEvent = {
  preventDefault() {}
};

it(`On change gets called with the right arguments`, () => {
  const onUserAnswer = jest.fn();
  const tree = shallow(<GameArtist
    question={mock}
    onAnswer={onUserAnswer}
    questionNumber={0}
  />);

  const answerInputs = tree.find(`.artist__input`);
  const firstAnswer = answerInputs.at(0);
  const secondAnswer = answerInputs.at(1);
  const thirdAnswer = answerInputs.at(2);

  firstAnswer.simulate(`click`, mockEvent);
  secondAnswer.simulate(`click`, mockEvent);
  thirdAnswer.simulate(`click`, mockEvent);

  expect(onUserAnswer).toHaveBeenCalledTimes(3);

  expect(onUserAnswer).toHaveBeenNthCalledWith(1, {
    id: 1,
    picture: `https://via.placeholder.com/134x134`,
    artist: `Mikle Jackson`
  });

  expect(onUserAnswer).toHaveBeenNthCalledWith(2, {
    id: 2,
    picture: `https://via.placeholder.com/134x134`,
    artist: `Selena Gomez`,
  });

  expect(onUserAnswer).toHaveBeenNthCalledWith(3, {
    id: 3,
    picture: `https://via.placeholder.com/134x134`,
    artist: `50 cent`,
  });

});
