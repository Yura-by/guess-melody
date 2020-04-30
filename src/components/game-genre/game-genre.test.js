import React from 'react';
import renderer from 'react-test-renderer';
import GameGenre from './game-genre';

const mock = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `1`,
      genre: `rock`,
    },
    {
      src: `2`,
      genre: `blues`,
    },
    {
      src: `3`,
      genre: `jazz`,
    },
    {
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
    />)
    .toJSON();
  expect(gameGenreTreee).toMatchSnapshot();
});
