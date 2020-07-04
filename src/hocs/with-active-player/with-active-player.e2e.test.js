import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActivePlayer from './with-active-player.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  id: 3
};

const MockComponent = (props) => {
  const {answers, renderPlayer} = props;
  return <div>
    {answers.map((answer, index) => {
      return <div key={index}>
        {renderPlayer(answer, index)}
      </div>;
    })}
  </div>;
};

const mockAnswers = [{src: `path`}, {src: `path`}, {src: `path`}];

MockComponent.propTypes = {
  answers: PropTypes.array.isRequired,
  renderPlayer: PropTypes.func.isRequired
};

const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Paused by default`, () => {
  const tree = mount(<MockComponentWrapped
    question={mock}
    answers={mockAnswers}
  />);

  expect(tree.state().activePlayer).toBe(-1);
});

it(`Active player changes correctly`, () => {

  global.window.HTMLMediaElement.prototype.pause = () => {};
  global.window.HTMLMediaElement.prototype.play = () => {};

  const tree = mount(<MockComponentWrapped
    question={mock}
    answers={mockAnswers}
  />);

  const playButtons = tree.find(`.track__button`);

  const firstPlayer = playButtons.at(0);
  const secondPlayer = playButtons.at(1);
  const thirdPlayer = playButtons.at(2);
  firstPlayer.props().onClick();
  expect(tree.state().activePlayer).toBe(0);

  secondPlayer.props().onClick();
  expect(tree.state().activePlayer).toBe(1);

  thirdPlayer.props().onClick();
  expect(tree.state().activePlayer).toBe(2);

  thirdPlayer.props().onClick();
  expect(tree.state().activePlayer).toBe(-1);
});
