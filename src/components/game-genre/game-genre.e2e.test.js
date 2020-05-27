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
      id: 1,
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `rock`,
    },
    {
      id: 2,
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `blues`,
    },
    {
      id: 3,
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `jazz`,
    },
    {
      id: 4,
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `pop`,
    },
  ],
};

it(`When users answer question is not sent`, () => {

  const onSubmitForm = jest.fn();
  const formSendPrevention = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
  />);

  const inputElement = tree.find(`.game__tracks`);
  inputElement.simulate(`submit`, {
    preventDefault: formSendPrevention
  });

  expect(onSubmitForm).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`Rendered checkbox are synchronized with state`, () => {
  const onSubmitForm = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
  />);

  expect(tree.state(`userAnswers`)).toEqual([false, false, false, false]);

  const inputs = tree.find(`input`);
  const firstInput = inputs.at(0);
  const secondInput = inputs.at(1);

  firstInput.simulate(`change`);

  expect(tree.state(`userAnswers`)).toEqual([true, false, false, false]);

  firstInput.simulate(`change`);
  expect(tree.state(`userAnswers`)).toEqual([false, false, false, false]);

  secondInput.simulate(`change`);
  expect(tree.state(`userAnswers`)).toEqual([false, true, false, false]);

});

it(`User answer passed to callback is consistent with internal component state`, () => {
  const onSubmitForm = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
  />);

  const inputs = tree.find(`input`);
  const thirdInput = inputs.at(2);
  thirdInput.simulate(`change`);
  const form = tree.find(`form`);
  form.simulate(`submit`, {preventDefault() {}});
  expect(tree.state(`userAnswers`)).toEqual([false, false, true, false]);
  expect(onSubmitForm).toHaveBeenCalledTimes(1);
  expect(onSubmitForm).toHaveBeenNthCalledWith(1, [false, false, true, false]);
});
