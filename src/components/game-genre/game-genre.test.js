import React from 'react';
import renderer from 'react-test-renderer';
import GameGenre from './game-genre';

const mock = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      id: 1,
      src: `1`,
      genre: `rock`,
    },
    {
      id: 2,
      src: `2`,
      genre: `blues`,
    },
    {
      id: 3,
      src: `3`,
      genre: `jazz`,
    },
    {
      id: 4,
      src: `4`,
      genre: `rock`,
    },
  ],
};

it(`GameGenre snapshot test`, () => {
  const gameGenreTreee = renderer
    .create(<GameGenre
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
  expect(gameGenreTreee).toMatchSnapshot();
});
