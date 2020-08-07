import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import GameGenre from './game-genre';

import {GameType, GenreQuestion} from '../../types';
import {noop} from '../../utils';

configure({adapter: new Adapter()});

const mock: GenreQuestion = {
  type: GameType.GENRE,
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

  const renderPlayer = jest.fn();

  const onSubmitForm = jest.fn();
  const formSendPrevention = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
    userAnswers={[]}
    renderAnswer={renderPlayer}
    onChange={noop}
  />);

  const inputElement = tree.find(`.game__tracks`);
  inputElement.simulate(`submit`, {
    preventDefault: formSendPrevention
  });

  expect(onSubmitForm).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`RenderAnswer calls on rendering`, () => {

  const renderPlayer = jest.fn();

  const onSubmitForm = jest.fn();
  shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
    userAnswers={[]}
    renderAnswer={renderPlayer}
    onChange={noop}
  />);

  expect(renderPlayer).toHaveBeenCalledTimes(4);
  expect(renderPlayer).toHaveBeenNthCalledWith(1, mock.answers[0], 0);
  expect(renderPlayer).toHaveBeenNthCalledWith(2, mock.answers[1], 1);
  expect(renderPlayer).toHaveBeenNthCalledWith(3, mock.answers[2], 2);
  expect(renderPlayer).toHaveBeenNthCalledWith(4, mock.answers[3], 3);
});

it(`When user answers to pass answers`, () => {

  const onSubmitForm = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={onSubmitForm}
    userAnswers={[false, true, true, false]}
    renderAnswer={jest.fn()}
    onChange={jest.fn()}
  />);

  const form = tree.find(`form`);
  form.simulate(`submit`, {preventDefault: noop});
  expect(onSubmitForm).toHaveBeenNthCalledWith(1, [false, true, true, false]);
});

it(`When user changes calls onChange`, () => {

  const onChange = jest.fn();
  const tree = shallow(<GameGenre
    question={mock}
    onAnswer={jest.fn()}
    userAnswers={[false, true, true, false]}
    renderAnswer={jest.fn()}
    onChange={onChange}
  />);

  const inputs = tree.find(`input`);
  const firstInput = inputs.at(1);
  const secondInput = inputs.at(2);
  const thirdInput = inputs.at(3);
  firstInput.simulate(`change`);
  secondInput.simulate(`change`);
  thirdInput.simulate(`change`);

  expect(onChange).toHaveBeenNthCalledWith(1, 1);
  expect(onChange).toHaveBeenNthCalledWith(2, 2);
  expect(onChange).toHaveBeenNthCalledWith(3, 3);
});

// it(`Rendered checkbox are synchronized with state`, () => {
//   const renderPlayer = jest.fn();

//   const onSubmitForm = jest.fn();
//   const tree = shallow(<GameGenre
//     question={mock}
//     onAnswer={onSubmitForm}
//     renderPlayer={renderPlayer}
//   />);

//   expect(tree.state(`userAnswers`)).toEqual([false, false, false, false]);

//   const inputs = tree.find(`input`);
//   const firstInput = inputs.at(0);
//   const secondInput = inputs.at(1);

//   firstInput.simulate(`change`);

//   expect(tree.state(`userAnswers`)).toEqual([true, false, false, false]);

//   firstInput.simulate(`change`);
//   expect(tree.state(`userAnswers`)).toEqual([false, false, false, false]);

//   secondInput.simulate(`change`);
//   expect(tree.state(`userAnswers`)).toEqual([false, true, false, false]);

// });

// it(`User answer passed to callback is consistent with internal component state`, () => {
//   const renderPlayer = jest.fn();

//   const onSubmitForm = jest.fn();
//   const tree = shallow(<GameGenre
//     question={mock}
//     onAnswer={onSubmitForm}
//     renderPlayer={renderPlayer}
//   />);

//   const inputs = tree.find(`input`);
//   const thirdInput = inputs.at(2);
//   thirdInput.simulate(`change`);
//   const form = tree.find(`form`);
//   form.simulate(`submit`, {preventDefault() {}});
//   expect(tree.state(`userAnswers`)).toEqual([false, false, true, false]);
//   expect(onSubmitForm).toHaveBeenCalledTimes(1);
//   expect(onSubmitForm).toHaveBeenNthCalledWith(1, [false, false, true, false]);

//   expect(tree.find(`input`).map((it) => it.prop(`checked`))).toEqual([false, false, true, false]);
// });
