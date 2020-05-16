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
      id: 1,
      picture: `path`,
      artist: `Mikle Jackson`,
    },
    {
      id: 2,
      picture: `path`,
      artist: `Selena Gomez`,
    },
    {
      id: 3,
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
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(gameArtistTree).toMatchSnapshot();
});
