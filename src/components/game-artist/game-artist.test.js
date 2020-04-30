import React from 'react';
import renderer from 'react-test-renderer';
import GameArtist from './game-artist';

const mock = {
  type: `artist`,
  song: {
    artist: `Mikle Jackson`,
    src: `path`,
  },
  answers: [
    {
      picture: `path`,
      artist: `Mikle Jackson`,
    },
    {
      picture: `path`,
      artist: `Selena Gomez`,
    },
    {
      picture: `path`,
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
