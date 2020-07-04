import {reducer, isArtistAnswerCorrect, isGenreAnswerCorrect, ActionCreator, Operation} from './reducer.js';

import MockAdapter from 'axios-mock-adapter';
import createApi from './api.js';


const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        id: 101,
        src: `https://web.archive.org/web/20060818144601/http://www.navyband.navy.mil/anthems/ANTHEMS/Belarus.mp3`,
        genre: `rock`,
      },
      {
        id: 102,
        src: `https://web.archive.org/web/20080410052226/http://www.navyband.navy.mil/anthems/ANTHEMS/Sweden.mp3`,
        genre: `blues`,
      },
      {
        id: 103,
        src: `https://web.archive.org/web/20080227123358/http://www.navyband.navy.mil/anthems/ANTHEMS/Slovack%20Republic.mp3`,
        genre: `jazz`,
      },
      {
        id: 104,
        src: `https://web.archive.org/web/20070205235901/http://www.navyband.navy.mil/anthems/ANTHEMS/Czech%20Republic.mp3`,
        genre: `pop`,
      },
    ],
  }, {
    type: `artist`,
    song: {
      artist: `Mikle Jackson`,
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
    },
    answers: [
      {
        id: 110,
        picture: `https://via.placeholder.com/134x134`,
        artist: `Mikle Jackson`,
      },
      {
        id: 111,
        picture: `https://via.placeholder.com/134x134`,
        artist: `Selena Gomez`,
      },
      {
        id: 112,
        picture: `https://via.placeholder.com/134x134`,
        artist: `50 cent`,
      },
    ],
  },
];

// describe(`Reducer works correctly`, () => {
//   it(`Reducer without additional parameters should return initial state`, () => {
//     expect(reducer(undefined, {})).toEqual({
//       step: -1,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     });
//   });

//   it(`Reducer should increment step by a given value when current step`, () => {
//     expect(reducer({
//       step: -1,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     }, {
//       type: `INCREMENT_STEP`,
//       payload: 1
//     })).toEqual({
//       step: 0,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     });

//     expect(reducer({
//       step: -2,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     }, {
//       type: `INCREMENT_STEP`,
//       payload: 1
//     })).toEqual({
//       step: -2,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     });
//   });

//   it(`Reducer should increment number of mistakes by a given value`, () => {
//     expect(reducer({
//       step: 0,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     }, {
//       type: `INCREMENT_MISTAKES`,
//       payload: 1
//     })).toEqual({
//       step: 0,
//       mistakes: 1,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     });

//     expect(reducer({
//       step: 0,
//       mistakes: 2,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     }, {
//       type: `INCREMENT_MISTAKES`,
//       payload: 0
//     })).toEqual({
//       step: 0,
//       mistakes: 2,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     });
//   });

//   it(`Reducer should correctly reset application state`, () => {
//     expect(reducer({
//       step: 10000,
//       mistakes: 70,
//       maxMistakes: 90,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     }, {
//       type: `RESET`,
//       payload: 0
//     })).toEqual({
//       step: -1,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 120,
//       currentTime: 0,
//       questions,
//       timerId: -1
//     });
//   });

//   it(`Reducer should correctly reduce time application state`, () => {
//     expect(reducer({
//       step: 2,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 15000,
//       currentTime: 140000,
//       questions,
//       timerId: 3
//     }, {
//       type: `REDUCE_TIME`,
//       payload: 12
//     })).toEqual({
//       step: 2,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 15000,
//       currentTime: 12,
//       questions,
//       timerId: 3
//     });
//   });

//   it(`Reducer should correctly time ended application state`, () => {
//     expect(reducer({
//       step: 12,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 15000,
//       currentTime: 140000,
//       questions,
//       timerId: 3
//     }, {
//       type: `TIME_ENDED`,
//       payload: -5
//     })).toEqual({
//       step: -5,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 15000,
//       currentTime: 140000,
//       questions,
//       timerId: 3
//     });
//   });

//   it(`Reducer should correctly set timer id application state`, () => {
//     expect(reducer({
//       step: 12,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 15000,
//       currentTime: 140000,
//       questions,
//       timerId: 3
//     }, {
//       type: `SET_TIMER_ID`,
//       payload: 119
//     })).toEqual({
//       step: 12,
//       mistakes: 0,
//       maxMistakes: 3,
//       gameTime: 15000,
//       currentTime: 140000,
//       questions,
//       timerId: 119
//     });
//   });

// });

// describe(`Buisness-logic works correct`, () => {

//   it(`Artist answer is checked correctly`, () => {
//     expect(isArtistAnswerCorrect({
//       id: 2,
//       picture: `path`,
//       artist: `correct`,
//     },
//     {
//       type: `artist`,
//       song: {
//         artist: `correct`,
//         src: `path`,
//       },
//       answers: [
//         {
//           id: 1,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//         {
//           id: 2,
//           picture: `path`,
//           artist: `correct`,
//         },
//         {
//           id: 3,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//       ],
//     })).toBe(true);

//     expect(isArtistAnswerCorrect({
//       id: 2,
//       picture: `path`,
//       artist: `incorrect`,
//     },
//     {
//       type: `artist`,
//       song: {
//         artist: `correct`,
//         src: `path`,
//       },
//       answers: [
//         {
//           id: 1,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//         {
//           id: 2,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//         {
//           id: 3,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//       ],
//     })).toBe(false);
//   });

//   it(`Genre question is checked correctly`, () => {
//     expect(isGenreAnswerCorrect([true, false, true, false], {
//       type: `genre`,
//       genre: `jazz`,
//       answers: [
//         {
//           id: 101,
//           src: `path`,
//           genre: `jazz`,
//         },
//         {
//           id: 102,
//           src: `path`,
//           genre: `blues`,
//         },
//         {
//           id: 103,
//           src: `path`,
//           genre: `jazz`,
//         },
//         {
//           id: 104,
//           src: `path`,
//           genre: `pop`,
//         },
//       ],
//     })).toBe(true);

//     expect(isGenreAnswerCorrect([false, true, true, false], {
//       type: `genre`,
//       genre: `jazz`,
//       answers: [
//         {
//           id: 101,
//           src: `path`,
//           genre: `rock`,
//         },
//         {
//           id: 102,
//           src: `path`,
//           genre: `blues`,
//         },
//         {
//           id: 103,
//           src: `path`,
//           genre: `jazz`,
//         },
//         {
//           id: 104,
//           src: `path`,
//           genre: `pop`,
//         },
//       ],
//     })).toBe(false);
//   });
// });

// describe(`ActionCreator works correctly`, () => {
//   it(`ActionCreator for increment step return correct action`, () => {
//     expect(ActionCreator.incrementStep(5, 700, 8)).toEqual({
//       type: `INCREMENT_STEP`,
//       payload: 1
//     });

//     expect(ActionCreator.incrementStep(6, 400, 7)).toEqual({
//       type: `RESET`,
//     });

//     expect(ActionCreator.incrementStep(10, 390, 8)).toEqual({
//       type: `RESET`,
//     });
//   });

//   it(`ActionCreator for reduce time return correct action`, () => {
//     expect(ActionCreator.reduceTime(150)).toEqual({
//       type: `REDUCE_TIME`,
//       payload: 150
//     });
//   });

//   it(`ActionCreator for set timer id return correct action`, () => {
//     expect(ActionCreator.setTimerId(12000)).toEqual({
//       type: `SET_TIMER_ID`,
//       payload: 12000
//     });
//   });

//   it(`ActionCreator for time ended return correct action`, () => {
//     expect(ActionCreator.timeEnded()).toEqual({
//       type: `TIME_ENDED`,
//       payload: -2
//     });
//   });

//   it(`ActionCreator for reset game return correct action`, () => {
//     expect(ActionCreator.resetGame()).toEqual({
//       type: `RESET`,
//     });
//   });

//   it(`ActonCreator for increment mistake artist question return action with 0 mistakes`, () => {
//     expect(ActionCreator.incrementMistake({
//       id: 1,
//       picture: `path`,
//       artist: `correct`
//     }, {
//       type: `artist`,
//       song: {
//         artist: `correct`,
//         src: `path`,
//       },
//       answers: [
//         {
//           id: 1,
//           picture: `path`,
//           artist: `correct`,
//         },
//         {
//           id: 2,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//         {
//           id: 3,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//       ],
//     }, 0, Infinity, 5)).toEqual({
//       type: `INCREMENT_MISTAKES`,
//       payload: 0
//     });
//   });

//   it(`ActonCreator for increment mistake artist question return action with 1 mistakes`, () => {
//     expect(ActionCreator.incrementMistake({
//       id: 1,
//       picture: `path`,
//       artist: `incorrect`
//     }, {
//       type: `artist`,
//       song: {
//         artist: `correct`,
//         src: `path`,
//       },
//       answers: [
//         {
//           id: 1,
//           picture: `path`,
//           artist: `icorrect`,
//         },
//         {
//           id: 2,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//         {
//           id: 3,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//       ],
//     }, 0, Infinity, 50)).toEqual({
//       type: `INCREMENT_MISTAKES`,
//       payload: 1
//     });
//   });

//   it(`ActionCreator for increment mistake question genre return mistakes 0`, () => {
//     expect(ActionCreator.incrementMistake([false, true, true, false], {
//       type: `genre`,
//       genre: `correct`,
//       answers: [
//         {
//           id: 1,
//           src: `path`,
//           genre: `incorrect`,
//         },
//         {
//           id: 2,
//           src: `path`,
//           genre: `correct`,
//         },
//         {
//           id: 3,
//           src: `path`,
//           genre: `correct`,
//         },
//         {
//           id: 4,
//           src: `path`,
//           genre: `incorrect`,
//         },
//       ],
//     }, 0, Infinity, 12)).toEqual({
//       type: `INCREMENT_MISTAKES`,
//       payload: 0
//     });
//   });

//   it(`ActionCreator for increment mistake question genre return mistakes 1`, () => {
//     expect(ActionCreator.incrementMistake([true, true, true, false], {
//       type: `genre`,
//       genre: `correct`,
//       answers: [
//         {
//           id: 1,
//           src: `path`,
//           genre: `incorrect`,
//         },
//         {
//           id: 2,
//           src: `path`,
//           genre: `incorrect`,
//         },
//         {
//           id: 3,
//           src: `path`,
//           genre: `correct`,
//         },
//         {
//           id: 4,
//           src: `path`,
//           genre: `incorrect`,
//         },
//       ],
//     }, 0, Infinity, 14)).toEqual({
//       type: `INCREMENT_MISTAKES`,
//       payload: 1
//     });
//   });

//   it(`ActionCreator reset state when user answers uncorrectly and there is no mistakes left`, () => {
//     expect(ActionCreator.incrementMistake({
//       id: 1,
//       picture: `path`,
//       artist: `incorrect`
//     }, {
//       type: `artist`,
//       song: {
//         artist: `correct`,
//         src: `path`,
//       },
//       answers: [
//         {
//           id: 1,
//           picture: `path`,
//           artist: `icorrect`,
//         },
//         {
//           id: 2,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//         {
//           id: 3,
//           picture: `path`,
//           artist: `incorrect`,
//         },
//       ],
//     }, Infinity, 0)).toEqual({
//       type: `TIME_ENDED`,
//       payload: -2
//     });

//     expect(ActionCreator.incrementMistake([true, true, true, false], {
//       type: `genre`,
//       genre: `correct`,
//       answers: [
//         {
//           id: 1,
//           src: `path`,
//           genre: `incorrect`,
//         },
//         {
//           id: 2,
//           src: `path`,
//           genre: `incorrect`,
//         },
//         {
//           id: 3,
//           src: `path`,
//           genre: `correct`,
//         },
//         {
//           id: 4,
//           src: `path`,
//           genre: `incorrect`,
//         },
//       ],
//     }, Infinity, 0)).toEqual({
//       type: `TIME_ENDED`,
//       payload: -2
//     });
//   });
// });

describe(`Operation work correctly`, () => {

  it(`loadQuestions works correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return Operation.loadQuestions()(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: [{"fake": true}],
          type: `ADD_QUIETIONS`
        });
      }
      );
  });

  it(`checkAuth works correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return Operation.checkAuth()(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: false,
          type: `IS_REQUIRE_AUTHORIZATION`
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          payload: [{fake: true}],
          type: `ADD_USER_DATA`
        });
      }
      );
  });

  it(`login works correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const mockData = {
      email: `www`,
      password: `ooo`
    };

    const apiMock = new MockAdapter(api);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return Operation.login(mockData)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: [{fake: true}],
          type: `ADD_USER_DATA`
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          payload: false,
          type: `BAD_LOGIN_DATA`
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          payload: false,
          type: `IS_REQUIRE_AUTHORIZATION`
        });
      }
      );
  });
});
