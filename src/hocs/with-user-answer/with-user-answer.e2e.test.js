import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withUserAnswer from './with-user-answer.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const onAnswer = jest.fn();

  const MockComponent = () => <div></div>;

  const WithUserAnswer = withUserAnswer(MockComponent);

  const tree = shallow(<WithUserAnswer
    onAnswer={onAnswer}
    question={mock.question}
  />);

  expect(tree.state().userAnswers).toEqual([false, false, false, false]);
  tree.props().onChange(0);

  expect(tree.state().userAnswers).toEqual([true, false, false, false]);
  tree.props().onChange(0);

  expect(tree.state().userAnswers).toEqual([false, false, false, false]);
  tree.props().onChange(3);

  expect(tree.state().userAnswers).toEqual([false, false, false, true]);
});
