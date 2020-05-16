import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';

it(`Snapshot test for AudioPlayer`, () => {
  const tree = renderer
    .create(<AudioPlayer
      src="https://web.archive.org/web/20060818144601/http://www.navyband.navy.mil/anthems/ANTHEMS/Belarus.mp3"
      isPlaying={false}
      onPlayButtonClick={() => {}}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
