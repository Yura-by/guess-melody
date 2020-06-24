import withPlayer from './with-player.jsx';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import PropTypes from 'prop-types';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {children, isLoading, isPlaying, onPlayButtonClick} = props;
  return (
    <div>
      <button
        disabled={isLoading}
        className={`track__button ${isPlaying}`}
        onClick={onPlayButtonClick}
      />
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.object,
  isLoading: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onPlayButtonClick: PropTypes.func
};

const WithPlayer = withPlayer(MockComponent);

it(`isPlaying toggle correctly`, () => {
  const onPlay = jest.fn();
  const tree = mount(<WithPlayer
    isPlaying={false}
    src={`path`}
    onPlayButtonClick={onPlay}
  />);

  global.window.HTMLMediaElement.prototype.pause = () => {};
  global.window.HTMLMediaElement.prototype.play = () => {};

  const audioElement = tree.find(`audio`);
  audioElement.getDOMNode().dispatchEvent(new global.window.Event(`canplaythrough`));

  expect(tree.state().isPlaying).toBe(false);

  const buttonElement = tree.find(`.track__button`);
  buttonElement.simulate(`click`);

  expect(onPlay).toHaveBeenCalledTimes(1);

  expect(tree.state().isPlaying).toBe(true);
});
