import adapter from './adapter-for-questions.js';

const mock = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `pop`,
      },
    ],
  },
  {
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
  }
];

it(`Adapter correct add Id to each answer`, () => {
  expect(adapter(mock)[0]).toEqual(expect.objectContaining({
    type: expect.any(String),
    genre: expect.any(String),
    answers: expect.any(Array)
  }));

  expect(adapter(mock)[0].answers[0]).toEqual(expect.objectContaining({
    src: expect.any(String),
    genre: expect.any(String),
    id: expect.any(Number)
  }));
});
