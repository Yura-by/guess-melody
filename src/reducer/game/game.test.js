import {reducer, ActionCreator, ActionType, initialState, resetState, isArtistAnswerCorrect, isGenreAnswerCorrect} from './game.js';

describe(`Game reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should increment step by a given value when current step`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    });

    expect(reducer({
      step: -2,
      mistakes: 0,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    })).toEqual({
      step: -2,
      mistakes: 0,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    })).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    });

    expect(reducer({
      step: -1,
      mistakes: 1,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    })).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 0,
      timerId: -1,
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 58000,
      mistakes: 19,
      maxMistakes: 12,
      gameTime: 120,
      currentTime: 17,
      timerId: 16,
    }, {
      type: ActionType.RESET_GAME,
      payload: resetState
    })).toEqual({
      step: -1,
      mistakes: 0,
      currentTime: 0,
      timerId: -1,
      maxMistakes: 12,
      gameTime: 120,
    });
  });

  it(`Reducer should correctly reduce time application state`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      currentTime: 150,
      timerId: -1,
      maxMistakes: 12,
      gameTime: 120,
    }, {
      type: ActionType.REDUCE_TIME,
      payload: 12
    })).toEqual({
      step: -1,
      mistakes: 0,
      currentTime: 12,
      timerId: -1,
      maxMistakes: 12,
      gameTime: 120,
    });
  });

  it(`Reducer should correctly set timer id application state`, () => {
    expect(reducer({
      step: -5,
      mistakes: 0,
      currentTime: 150,
      timerId: -1,
      maxMistakes: 12,
      gameTime: 120,
    }, {
      type: ActionType.SET_TIMER_ID,
      payload: 119
    })).toEqual({
      step: -5,
      mistakes: 0,
      currentTime: 150,
      timerId: 119,
      maxMistakes: 12,
      gameTime: 120,
    });
  });


});

describe(`Buisness-logic works correct`, () => {

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

describe(`Game ActionCreator works correctly`, () => {
  it(`ActionCreator for increment step return correct action`, () => {
    expect(ActionCreator.incrementStep(5, 700, 8)).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1
    });
  });

  it(`ActionCreator for reduce time return correct action`, () => {
    expect(ActionCreator.reduceTime(150)).toEqual({
      type: ActionType.REDUCE_TIME,
      payload: 150
    });
  });

  it(`ActionCreator for set timer id return correct action`, () => {
    expect(ActionCreator.setTimerId(12000)).toEqual({
      type: ActionType.SET_TIMER_ID,
      payload: 12000
    });
  });

  it(`ActionCreator for reset game return correct action`, () => {
    expect(ActionCreator.resetGame()).toEqual({
      type: ActionType.RESET_GAME,
      payload: resetState
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
    }, 0, Infinity, 5)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
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
    }, 0, Infinity, 50)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
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
    }, 0, Infinity, 12)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
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
    }, 0, Infinity, 14)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    });
  });

});

