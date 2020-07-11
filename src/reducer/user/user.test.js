import {reducer, ActionCreator, ActionType, Operation, initialState, resetState} from './user.js';

describe(`User reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer correctly set requireAuthorization`, () => {
    expect(reducer({
      isRequireAuthorization: false,
      userData: {},
      isBadLoginData: false
    }, {
      type: ActionType.IS_REQUIRE_AUTHORIZATION,
      payload: true
    })).toEqual({
      isRequireAuthorization: true,
      userData: {},
      isBadLoginData: false
    });
  });

});
