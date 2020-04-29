import React from 'react';
import renderer from 'react-test-renderer';
import GameGenre from './game-genre';

const mock = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `rock`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `blues`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      genre: `jazz`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
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
