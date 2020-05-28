import {reducer, isArtistAnswerCorrect, isGenreAnswerCorrect} from './reducer.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should increment step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0
    }, {
      type: `INCREMENT_STEP`,
      payload: 1
    })).toEqual({
      step: 0,
      mistakes: 0
    });

    expect(reducer({
      step: -1,
      mistakes: 0
    }, {
      type: `INCREMENT_STEP`,
      payload: 0
    })).toEqual({
      step: -1,
      mistakes: 0
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 1
    })).toEqual({
      step: -1,
      mistakes: 1
    });

    expect(reducer({
      step: -1,
      mistakes: 0
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 0
    })).toEqual({
      step: -1,
      mistakes: 0
    });
  });
});

describe(`Buisness-logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      id: 2,
      picture: `path`,
      artist: `correct`,
    },
    {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path`,
      },
      answers: [
        {
          id: 1,
          picture: `path`,
          artist: `incorrect`,
        },
        {
          id: 2,
          picture: `path`,
          artist: `correct`,
        },
        {
          id: 3,
          picture: `path`,
          artist: `incorrect`,
        },
      ],
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      id: 2,
      picture: `path`,
      artist: `incorrect`,
    },
    {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path`,
      },
      answers: [
        {
          id: 1,
          picture: `path`,
          artist: `incorrect`,
        },
        {
          id: 2,
          picture: `path`,
          artist: `incorrect`,
        },
        {
          id: 3,
          picture: `path`,
          artist: `incorrect`,
        },
      ],
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect([true, false, true, false], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          id: 101,
          src: `path`,
          genre: `jazz`,
        },
        {
          id: 102,
          src: `path`,
          genre: `blues`,
        },
        {
          id: 103,
          src: `path`,
          genre: `jazz`,
        },
        {
          id: 104,
          src: `path`,
          genre: `pop`,
        },
      ],
    })).toBe(true);

    expect(isGenreAnswerCorrect([false, true, true, false], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          id: 101,
          src: `path`,
          genre: `rock`,
        },
        {
          id: 102,
          src: `path`,
          genre: `blues`,
        },
        {
          id: 103,
          src: `path`,
          genre: `jazz`,
        },
        {
          id: 104,
          src: `path`,
          genre: `pop`,
        },
      ],
    })).toBe(false);
  });
});
