import React from 'react';
import renderer from 'react-test-renderer';
import GameArtist from './game-artist';

const mock = {
  type: `artist`,
  song: {
    artist: `Mikle Jackson`,
    src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
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

it(`GameArtist snaphot test`, () => {
  const gameArtistTree = renderer
    .create(<GameArtist
      question={mock}
      onAnswer={() => {}}
      questionNumber={0}
    />)
    .toJSON();

  expect(gameArtistTree).toMatchSnapshot();
});
