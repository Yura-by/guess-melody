import {reducer, isArtistAnswerCorrect, isGenreAnswerCorrect, ActionCreator} from './reducer.js';

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

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 1000,
      mistakes: 15000
    }, {
      type: `RESET`,
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

describe(`ActionCreator works correctly`, () => {
  it(`ActionCreator for increment step return correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1
    });
  });

  it(`ActonCreator for increment mistake artist question return action with 0 mistakes`, () => {
    expect(ActionCreator.incrementMistake({
      id: 1,
      picture: `path`,
      artist: `correct`
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path`,
      },
      answers: [
        {
          id: 1,
          picture: `path`,
          artist: `correct`,
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
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0
    });
  });

  it(`ActonCreator for increment mistake artist question return action with 1 mistakes`, () => {
    expect(ActionCreator.incrementMistake({
      id: 1,
      picture: `path`,
      artist: `incorrect`
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path`,
      },
      answers: [
        {
          id: 1,
          picture: `path`,
          artist: `icorrect`,
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
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1
    });
  });

  it(`ActionCreator for increment mistake question genre return mistakes 0`, () => {
    expect(ActionCreator.incrementMistake([false, true, true, false], {
      type: `genre`,
      genre: `correct`,
      answers: [
        {
          id: 1,
          src: `path`,
          genre: `incorrect`,
        },
        {
          id: 2,
          src: `path`,
          genre: `correct`,
        },
        {
          id: 3,
          src: `path`,
          genre: `correct`,
        },
        {
          id: 4,
          src: `path`,
          genre: `incorrect`,
        },
      ],
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0
    });
  });

  it(`ActionCreator for increment mistake question genre return mistakes 1`, () => {
    expect(ActionCreator.incrementMistake([true, true, true, false], {
      type: `genre`,
      genre: `correct`,
      answers: [
        {
          id: 1,
          src: `path`,
          genre: `incorrect`,
        },
        {
          id: 2,
          src: `path`,
          genre: `incorrect`,
        },
        {
          id: 3,
          src: `path`,
          genre: `correct`,
        },
        {
          id: 4,
          src: `path`,
          genre: `incorrect`,
        },
      ],
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1
    });
  });

  it(`ActionCreator reset state when user answers uncorrectly and there is no mistakes left`, () => {
    expect(ActionCreator.incrementMistake({
      id: 1,
      picture: `path`,
      artist: `incorrect`
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: `path`,
      },
      answers: [
        {
          id: 1,
          picture: `path`,
          artist: `icorrect`,
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
    }, Infinity, 0)).toEqual({
      type: `RESET`
    });

    expect(ActionCreator.incrementMistake([true, true, true, false], {
      type: `genre`,
      genre: `correct`,
      answers: [
        {
          id: 1,
          src: `path`,
          genre: `incorrect`,
        },
        {
          id: 2,
          src: `path`,
          genre: `incorrect`,
        },
        {
          id: 3,
          src: `path`,
          genre: `correct`,
        },
        {
          id: 4,
          src: `path`,
          genre: `incorrect`,
        },
      ],
    }, Infinity, 0)).toEqual({
      type: `RESET`
    });
  });

});
