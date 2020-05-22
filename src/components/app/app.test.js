import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const mock = {
  settings: {
    gameTime: 0,
    errorCount: 0
  },
  questions: [
    {
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
    },
    {
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
    }
  ]
};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      gameData={mock}
    />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
