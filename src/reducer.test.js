import {reducer} from './reducer.js';

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
});

it(`Reducer should increment mistakes by a given value`, () => {
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
});
