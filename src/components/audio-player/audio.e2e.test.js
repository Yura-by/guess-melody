import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`AudioPlayer toggle state with click button`, () => {
  const onButtonClick = jest.fn();

  global.window.HTMLMediaElement.prototype.pause = () => {};

  const tree = mount(<AudioPlayer
    src="https://web.archive.org/web/20060818144601/http://www.navyband.navy.mil/anthems/ANTHEMS/Belarus.mp3"
    isPlaying={false}
    onPlayButtonClick={onButtonClick}
  />);

  expect(tree.state(`isPlaying`)).toEqual(false);
  tree.setState({isLoading: false});

  const buttonElement = tree.find(`.track__button`);
  buttonElement.simulate(`click`, {preventDefault() {}});
  expect(onButtonClick).toHaveBeenCalledTimes(1);
  expect(tree.state(`isPlaying`)).toEqual(true);

  buttonElement.simulate(`click`, {preventDefault() {}});
  expect(onButtonClick).toHaveBeenCalledTimes(2);
  expect(tree.state(`isPlaying`)).toEqual(false);
});

// const audioElement = tree.find(`audio`);
// audioElement.getDOMNode().dispatchEvent(new global.window.Event(`loading`));
