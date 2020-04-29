import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameGenre from './game-genre';

Enzyme.configure({adapter: new Adapter()});

const mock = {
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
      genre: `pop`,
    },
  ],
};

it(`On submit gets called with the right arguments`, () => {

  const onSubmitForm = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
    questionNumber={0}
  />);

  const inputElement = tree.find(`.game__tracks`);
  inputElement.simulate(`submit`, {preventDefault() {}});

  expect(onSubmitForm).toHaveBeenCalledTimes(1);

  // expect(onSubmitForm).toHaveBeenCalledWith(expect.any(Object), expect.any(Array));

  expect(onSubmitForm).toHaveBeenCalledWith(expect.objectContaining({
    type: expect.any(String),
    genre: expect.any(String),
    answers: expect.any(Array)
  }),
  expect.any(Array));
});
